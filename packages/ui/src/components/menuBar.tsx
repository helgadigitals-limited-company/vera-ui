"use client"

import * as React from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

// Types for menu items
export interface MenuLink {
  title: string
  href: string
  description?: string
  icon?: React.ReactNode
}

export interface FeaturedSection {
  href: string
  title: string
  description: string
  className?: string
}

export interface MenuItemConfig {
  trigger: string
  type: "dropdown" | "link" | "grid" | "featured"
  href?: string // For type: "link"
  items?: MenuLink[] // For type: "dropdown", "grid"
  featured?: FeaturedSection // For type: "featured"
  gridClassName?: string // Custom grid layout
  contentClassName?: string // Custom content styling
}

export interface MenuBarProps {
  items: MenuItemConfig[]
  viewport?: boolean
  className?: string
  LinkComponent?: React.ElementType
}

// Create a router-compatible link wrapper
interface RouterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string
  to?: string
}

const createRouterLink = (LinkComponent: React.ElementType) => {
  return React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => {
    const { href, ...rest } = props
    
    // Check if LinkComponent uses 'to' prop (React Router style)
    // Simple check: if it's not a string (HTML element), assume it's React Router
    const isReactRouter = typeof LinkComponent !== 'string'
    
    if (isReactRouter && href) {
      // Convert href to 'to' for React Router Link
      return <LinkComponent to={href} ref={ref} {...rest} />
    }
    
    // Use href for regular anchor tags or Next.js Link
    return <LinkComponent href={href} ref={ref} {...rest} />
  })
}

export function MenuBar({
  items,
  viewport = false,
  className,
  LinkComponent = "a",
}: MenuBarProps) {
  // Create the router-compatible link component
  const RouterCompatibleLink = createRouterLink(LinkComponent)
  
  return (
    <NavigationMenu viewport={viewport} className={className}>
      <NavigationMenuList>
        {items.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.type === "link" ? (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <RouterCompatibleLink href={item.href!}>{item.trigger}</RouterCompatibleLink>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger>{item.trigger}</NavigationMenuTrigger>
                <NavigationMenuContent className="w-auto min-w-max">
                  {item.type === "featured" && item.featured && item.items ? (
                    <ul className={cn("grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]", item.gridClassName)}>
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <RouterCompatibleLink
                            className={cn(
                              "from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md",
                              item.featured.className
                            )}
                            href={item.featured.href}
                          >
                            <div className="mt-4 mb-2 text-lg font-medium">
                              {item.featured.title}
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              {item.featured.description}
                            </p>
                          </RouterCompatibleLink>
                        </NavigationMenuLink>
                      </li>
                      {item.items.map((link) => (
                        <ListItem
                          key={link.title}
                          href={link.href}
                          title={link.title}
                          LinkComponent={RouterCompatibleLink}
                        >
                          {link.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : item.type === "grid" ? (
                    <ul className={cn("grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]", item.gridClassName)}>
                      {item.items?.map((link) => (
                        <ListItem
                          key={link.title}
                          title={link.title}
                          href={link.href}
                          LinkComponent={RouterCompatibleLink}
                        >
                          {link.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : (
                    <ul className={cn("grid w-[200px] gap-4", item.gridClassName)}>
                      <li>
                        {item.items?.map((link) => (
                          <NavigationMenuLink key={link.title} asChild>
                            <RouterCompatibleLink
                              href={link.href}
                              className={cn(
                                link.icon && "flex-row items-center gap-2"
                              )}
                            >
                              {link.icon}
                              {link.description ? (
                                <>
                                  <div className="font-medium">{link.title}</div>
                                  <div className="text-muted-foreground">
                                    {link.description}
                                  </div>
                                </>
                              ) : (
                                link.title
                              )}
                            </RouterCompatibleLink>
                          </NavigationMenuLink>
                        ))}
                      </li>
                    </ul>
                  )}
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"li"> {
  title: string
  href: string
  LinkComponent?: React.ElementType
}

function ListItem({
  title,
  children,
  href,
  LinkComponent = "a",
  ...props
}: ListItemProps) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <LinkComponent href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </LinkComponent>
      </NavigationMenuLink>
    </li>
  )
}
