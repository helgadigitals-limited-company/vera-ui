// Generates packages/ui/registry.json from the component sources so the whole
// vera-ui surface is installable via the shadcn CLI. Run before `shadcn build`.
//
// Cross-component deps are emitted as namespaced `@vera-ui/<name>` registry
// dependencies so they resolve inside THIS registry instead of falling through
// to ui.shadcn.com (which ships API-incompatible base-ui components).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const uiDir = join(root, "src/components/ui");

const HOMEPAGE = "https://helgadigitals-limited-company.github.io/vera-ui";

// npm packages that are peers/provided by the consumer's toolchain — never
// emitted as installable `dependencies`.
const PEER_OR_PROVIDED = new Set([
  "react",
  "react-dom",
  "react/jsx-runtime",
]);

// Human titles/descriptions are optional; fall back to a generated title.
const titleCase = (name) =>
  name
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// file "Multi-select.tsx" -> registry name "multi-select"
const fileToName = (file) => basename(file).replace(/\.tsx$/, "").toLowerCase();

// normalize an npm import specifier to its installable package name
const toPackageName = (spec) => {
  if (spec.startsWith("@")) {
    const [scope, pkg] = spec.split("/");
    return pkg ? `${scope}/${pkg}` : scope;
  }
  return spec.split("/")[0];
};

const importSpecifiers = (src) => {
  const specs = new Set();
  const re = /(?:import|export)[\s\S]*?from\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(src))) specs.add(m[1]);
  // bare side-effect imports: import "x"
  const re2 = /import\s*['"]([^'"]+)['"]/g;
  while ((m = re2.exec(src))) specs.add(m[1]);
  return [...specs];
};

const uiFiles = readdirSync(uiDir)
  .filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx"))
  .sort();

const uiNames = new Set(uiFiles.map(fileToName));

const items = [];

// ---- lib + hook items referenced by components -----------------------------
items.push({
  name: "utils",
  type: "registry:lib",
  title: "Utils",
  description: "cn() class-name helper and shared utilities.",
  dependencies: ["clsx", "tailwind-merge"],
  files: [{ path: "src/lib/utils.ts", type: "registry:lib" }],
});

items.push({
  name: "use-mobile",
  type: "registry:hook",
  title: "use-mobile",
  description: "Media-query hook that tracks the mobile breakpoint.",
  registryDependencies: [],
  files: [{ path: "src/hooks/use-mobile.ts", type: "registry:hook" }],
});

// ---- theme (CSS variables) -------------------------------------------------
items.push({
  name: "vera-ui-theme",
  type: "registry:style",
  title: "Vera UI Theme",
  description:
    "Vera UI design tokens (color palette, radius, shadows, fonts) as CSS variables.",
  dependencies: ["tw-animate-css", "@fontsource-variable/inter"],
  files: [{ path: "src/index.css", type: "registry:style" }],
});

// ---- component items -------------------------------------------------------
for (const file of uiFiles) {
  const name = fileToName(file);
  const src = readFileSync(join(uiDir, file), "utf8");
  const specs = importSpecifiers(src);

  const dependencies = new Set();
  const registryDependencies = new Set();

  for (const spec of specs) {
    if (spec.startsWith("@/components/ui/")) {
      const dep = basename(spec).toLowerCase();
      if (dep !== name) registryDependencies.add(`@vera-ui/${dep}`);
    } else if (spec.startsWith("./") || spec.startsWith("../")) {
      const dep = basename(spec).toLowerCase();
      if (uiNames.has(dep) && dep !== name)
        registryDependencies.add(`@vera-ui/${dep}`);
    } else if (spec === "@/lib/utils") {
      registryDependencies.add("@vera-ui/utils");
    } else if (spec.startsWith("@/hooks/")) {
      registryDependencies.add(`@vera-ui/${basename(spec).toLowerCase()}`);
    } else if (spec.startsWith("@/")) {
      // other internal alias imports — skip (not a component surface)
    } else {
      const pkg = toPackageName(spec);
      if (!PEER_OR_PROVIDED.has(pkg) && !PEER_OR_PROVIDED.has(spec))
        dependencies.add(pkg);
    }
  }

  const item = {
    name,
    type: "registry:ui",
    title: titleCase(name),
    description: `${titleCase(name)} component.`,
  };
  if (dependencies.size)
    item.dependencies = [...dependencies].sort();
  if (registryDependencies.size)
    item.registryDependencies = [...registryDependencies].sort();
  item.files = [
    { path: `src/components/ui/${file}`, type: "registry:ui" },
  ];
  items.push(item);
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "vera-ui",
  homepage: HOMEPAGE,
  items,
};

writeFileSync(
  join(root, "registry.json"),
  JSON.stringify(registry, null, 2) + "\n"
);

console.log(
  `Generated registry.json with ${items.length} items ` +
    `(${uiFiles.length} components + utils + use-mobile + theme).`
);
