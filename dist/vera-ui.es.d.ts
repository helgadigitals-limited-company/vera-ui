import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { ClassProp } from 'class-variance-authority/types';
import { ClassValue } from 'clsx';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { Command as Command_2 } from 'cmdk';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { ControllerProps } from 'react-hook-form';
import { DayButton } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import { default as default_2 } from 'embla-carousel-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Drawer as Drawer_2 } from 'vaul';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { FieldError } from 'react-hook-form';
import { FieldPath } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { FormProviderProps } from 'react-hook-form';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { JSX } from 'react/jsx-runtime';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { OTPInput } from 'input-otp';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React_2 from 'react';
import * as RechartsPrimitive from 'recharts';
import * as ResizablePrimitive from 'react-resizable-panels';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { Slot } from '@radix-ui/react-slot';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ThemeProviderState } from '../lib/theme-context';
import { ToasterProps } from 'sonner';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { UseEmblaCarouselType } from 'embla-carousel-react';
import { VariantProps } from 'class-variance-authority';

export declare function Accordion({ ...props }: React_2.ComponentProps<typeof AccordionPrimitive.Root>): JSX.Element;

export declare function AccordionContent({ className, children, ...props }: React_2.ComponentProps<typeof AccordionPrimitive.Content>): JSX.Element;

export declare function AccordionItem({ className, ...props }: React_2.ComponentProps<typeof AccordionPrimitive.Item>): JSX.Element;

export declare function AccordionTrigger({ className, children, ...props }: React_2.ComponentProps<typeof AccordionPrimitive.Trigger>): JSX.Element;

export declare function Alert({ className, variant, ...props }: React_2.ComponentProps<"div"> & VariantProps<typeof alertVariants>): JSX.Element;

export declare function AlertDescription({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function AlertDialog({ ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Root>): JSX.Element;

export declare function AlertDialogAction({ className, ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Action>): JSX.Element;

export declare function AlertDialogCancel({ className, ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Cancel>): JSX.Element;

export declare function AlertDialogContent({ className, ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Content>): JSX.Element;

export declare function AlertDialogDescription({ className, ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Description>): JSX.Element;

export declare function AlertDialogFooter({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function AlertDialogHeader({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function AlertDialogOverlay({ className, ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Overlay>): JSX.Element;

export declare function AlertDialogPortal({ ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Portal>): JSX.Element;

export declare function AlertDialogTitle({ className, ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Title>): JSX.Element;

export declare function AlertDialogTrigger({ ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Trigger>): JSX.Element;

export declare function AlertTitle({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function AspectRatio({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>): JSX.Element;

export declare function Avatar({ className, ...props }: React_2.ComponentProps<typeof AvatarPrimitive.Root>): JSX.Element;

export declare function AvatarFallback({ className, ...props }: React_2.ComponentProps<typeof AvatarPrimitive.Fallback>): JSX.Element;

export declare function AvatarImage({ className, ...props }: React_2.ComponentProps<typeof AvatarPrimitive.Image>): JSX.Element;

export declare function Badge({ className, variant, asChild, ...props }: React_2.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): JSX.Element;

export declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Breadcrumb({ ...props }: React_2.ComponentProps<"nav">): JSX.Element;

export declare function BreadcrumbEllipsis({ className, ...props }: React_2.ComponentProps<"span">): JSX.Element;

export declare function BreadcrumbItem({ className, ...props }: React_2.ComponentProps<"li">): JSX.Element;

export declare function BreadcrumbLink({ asChild, className, ...props }: React_2.ComponentProps<"a"> & {
    asChild?: boolean;
}): JSX.Element;

export declare function BreadcrumbList({ className, ...props }: React_2.ComponentProps<"ol">): JSX.Element;

export declare function BreadcrumbPage({ className, ...props }: React_2.ComponentProps<"span">): JSX.Element;

export declare function BreadcrumbSeparator({ children, className, ...props }: React_2.ComponentProps<"li">): JSX.Element;

export declare function Button({ className, variant, size, asChild, ...props }: React_2.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}): JSX.Element;

export declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, formatters, components, ...props }: React_2.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React_2.ComponentProps<typeof Button>["variant"];
}): JSX.Element;

export declare function CalendarDayButton({ className, day, modifiers, ...props }: React_2.ComponentProps<typeof DayButton>): JSX.Element;

export declare function Card({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardAction({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardContent({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardDescription({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardFooter({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardHeader({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardTitle({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function Carousel({ orientation, opts, setApi, plugins, className, children, ...props }: React_2.ComponentProps<"div"> & CarouselProps): JSX.Element;

export declare type CarouselApi = UseEmblaCarouselType[1];

export declare function CarouselContent({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CarouselItem({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CarouselNext({ className, variant, size, ...props }: React_2.ComponentProps<typeof Button>): JSX.Element;

declare type CarouselOptions = UseCarouselParameters[0];

declare type CarouselPlugin = UseCarouselParameters[1];

export declare function CarouselPrevious({ className, variant, size, ...props }: React_2.ComponentProps<typeof Button>): JSX.Element;

declare type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
};

export declare type ChartConfig = {
    [k in string]: {
        label?: React_2.ReactNode;
        icon?: React_2.ComponentType;
    } & ({
        color?: string;
        theme?: never;
    } | {
        color?: never;
        theme: Record<keyof typeof THEMES, string>;
    });
};

export declare function ChartContainer({ id, className, children, config, ...props }: React_2.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React_2.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}): JSX.Element;

export declare const ChartLegend: typeof RechartsPrimitive.Legend;

export declare function ChartLegendContent({ className, hideIcon, payload, verticalAlign, nameKey, }: React_2.ComponentProps<"div"> & Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
}): JSX.Element | null;

export declare const ChartStyle: ({ id, config }: {
    id: string;
    config: ChartConfig;
}) => JSX.Element | null;

export declare const ChartTooltip: typeof RechartsPrimitive.Tooltip;

export declare function ChartTooltipContent({ active, payload, className, indicator, hideLabel, hideIndicator, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, }: React_2.ComponentProps<typeof RechartsPrimitive.Tooltip> & React_2.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
}): JSX.Element | null;

export declare function Checkbox({ className, ...props }: React_2.ComponentProps<typeof CheckboxPrimitive.Root>): JSX.Element;

export declare function cn(...inputs: ClassValue[]): string;

export declare function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>): JSX.Element;

export declare function CollapsibleContent({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>): JSX.Element;

export declare function CollapsibleTrigger({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>): JSX.Element;

export declare const Combobox: React_2.ForwardRefExoticComponent<SelectComponentProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare function Command({ className, ...props }: React_2.ComponentProps<typeof Command_2>): JSX.Element;

export declare function CommandDialog({ title, description, children, className, showCloseButton, ...props }: React_2.ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
    className?: string;
    showCloseButton?: boolean;
}): JSX.Element;

export declare function CommandEmpty({ ...props }: React_2.ComponentProps<typeof Command_2.Empty>): JSX.Element;

export declare function CommandGroup({ className, ...props }: React_2.ComponentProps<typeof Command_2.Group>): JSX.Element;

export declare function CommandInput({ className, ...props }: React_2.ComponentProps<typeof Command_2.Input>): JSX.Element;

export declare function CommandItem({ className, ...props }: React_2.ComponentProps<typeof Command_2.Item>): JSX.Element;

export declare function CommandList({ className, ...props }: React_2.ComponentProps<typeof Command_2.List>): JSX.Element;

export declare function CommandSeparator({ className, ...props }: React_2.ComponentProps<typeof Command_2.Separator>): JSX.Element;

export declare function CommandShortcut({ className, ...props }: React_2.ComponentProps<"span">): JSX.Element;

export declare function ContextMenu({ ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Root>): JSX.Element;

export declare function ContextMenuCheckboxItem({ className, children, checked, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>): JSX.Element;

export declare function ContextMenuContent({ className, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Content>): JSX.Element;

export declare function ContextMenuGroup({ ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Group>): JSX.Element;

export declare function ContextMenuItem({ className, inset, variant, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): JSX.Element;

export declare function ContextMenuLabel({ className, inset, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
}): JSX.Element;

export declare function ContextMenuPortal({ ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Portal>): JSX.Element;

export declare function ContextMenuRadioGroup({ ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>): JSX.Element;

export declare function ContextMenuRadioItem({ className, children, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.RadioItem>): JSX.Element;

export declare function ContextMenuSeparator({ className, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Separator>): JSX.Element;

export declare function ContextMenuShortcut({ className, ...props }: React_2.ComponentProps<"span">): JSX.Element;

export declare function ContextMenuSub({ ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Sub>): JSX.Element;

export declare function ContextMenuSubContent({ className, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.SubContent>): JSX.Element;

export declare function ContextMenuSubTrigger({ className, inset, children, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): JSX.Element;

export declare function ContextMenuTrigger({ ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Trigger>): JSX.Element;

export declare function Dialog({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Root>): JSX.Element;

export declare function DialogClose({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Close>): JSX.Element;

export declare function DialogContent({ className, children, showCloseButton, ...props }: React_2.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
}): JSX.Element;

export declare function DialogDescription({ className, ...props }: React_2.ComponentProps<typeof DialogPrimitive.Description>): JSX.Element;

export declare function DialogFooter({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function DialogHeader({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function DialogOverlay({ className, ...props }: React_2.ComponentProps<typeof DialogPrimitive.Overlay>): JSX.Element;

export declare function DialogPortal({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Portal>): JSX.Element;

export declare function DialogTitle({ className, ...props }: React_2.ComponentProps<typeof DialogPrimitive.Title>): JSX.Element;

export declare function DialogTrigger({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Trigger>): JSX.Element;

export declare function Drawer({ ...props }: React_2.ComponentProps<typeof Drawer_2.Root>): JSX.Element;

export declare function DrawerClose({ ...props }: React_2.ComponentProps<typeof Drawer_2.Close>): JSX.Element;

export declare function DrawerContent({ className, children, ...props }: React_2.ComponentProps<typeof Drawer_2.Content>): JSX.Element;

export declare function DrawerDescription({ className, ...props }: React_2.ComponentProps<typeof Drawer_2.Description>): JSX.Element;

export declare function DrawerFooter({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function DrawerHeader({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function DrawerOverlay({ className, ...props }: React_2.ComponentProps<typeof Drawer_2.Overlay>): JSX.Element;

export declare function DrawerPortal({ ...props }: React_2.ComponentProps<typeof Drawer_2.Portal>): JSX.Element;

export declare function DrawerTitle({ className, ...props }: React_2.ComponentProps<typeof Drawer_2.Title>): JSX.Element;

export declare function DrawerTrigger({ ...props }: React_2.ComponentProps<typeof Drawer_2.Trigger>): JSX.Element;

export declare function DropdownMenu({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Root>): JSX.Element;

export declare function DropdownMenuCheckboxItem({ className, children, checked, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>): JSX.Element;

export declare function DropdownMenuContent({ className, sideOffset, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Content>): JSX.Element;

export declare function DropdownMenuGroup({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Group>): JSX.Element;

export declare function DropdownMenuItem({ className, inset, variant, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): JSX.Element;

export declare function DropdownMenuLabel({ className, inset, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
}): JSX.Element;

export declare function DropdownMenuPortal({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Portal>): JSX.Element;

export declare function DropdownMenuRadioGroup({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>): JSX.Element;

export declare function DropdownMenuRadioItem({ className, children, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>): JSX.Element;

export declare function DropdownMenuSeparator({ className, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Separator>): JSX.Element;

export declare function DropdownMenuShortcut({ className, ...props }: React_2.ComponentProps<"span">): JSX.Element;

export declare function DropdownMenuSub({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Sub>): JSX.Element;

export declare function DropdownMenuSubContent({ className, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.SubContent>): JSX.Element;

export declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): JSX.Element;

export declare function DropdownMenuTrigger({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Trigger>): JSX.Element;

export declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>(props: FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React_2.JSX.Element;

export declare function FormControl({ ...props }: React_2.ComponentProps<typeof Slot>): JSX.Element;

export declare function FormDescription({ className, ...props }: React_2.ComponentProps<"p">): JSX.Element;

export declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => JSX.Element;

export declare function FormItem({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function FormLabel({ className, ...props }: React_2.ComponentProps<typeof LabelPrimitive.Root>): JSX.Element;

export declare function FormMessage({ className, ...props }: React_2.ComponentProps<"p">): JSX.Element | null;

export declare function HoverCard({ ...props }: React_2.ComponentProps<typeof HoverCardPrimitive.Root>): JSX.Element;

export declare function HoverCardContent({ className, align, sideOffset, ...props }: React_2.ComponentProps<typeof HoverCardPrimitive.Content>): JSX.Element;

export declare function HoverCardTrigger({ ...props }: React_2.ComponentProps<typeof HoverCardPrimitive.Trigger>): JSX.Element;

export declare function Input({ className, type, ...props }: React_2.ComponentProps<"input">): JSX.Element;

export declare function InputOTP({ className, containerClassName, ...props }: React_2.ComponentProps<typeof OTPInput> & {
    containerClassName?: string;
}): JSX.Element;

export declare function InputOTPGroup({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function InputOTPSeparator({ ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function InputOTPSlot({ index, className, ...props }: React_2.ComponentProps<"div"> & {
    index: number;
}): JSX.Element;

export declare function Label({ className, ...props }: React_2.ComponentProps<typeof LabelPrimitive.Root>): JSX.Element;

export declare function Menubar({ className, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Root>): JSX.Element;

export declare function MenubarCheckboxItem({ className, children, checked, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.CheckboxItem>): JSX.Element;

export declare function MenubarContent({ className, align, alignOffset, sideOffset, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Content>): JSX.Element;

export declare function MenubarGroup({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Group>): JSX.Element;

export declare function MenubarItem({ className, inset, variant, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): JSX.Element;

export declare function MenubarLabel({ className, inset, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
}): JSX.Element;

export declare function MenubarMenu({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Menu>): JSX.Element;

export declare function MenubarPortal({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Portal>): JSX.Element;

export declare function MenubarRadioGroup({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.RadioGroup>): JSX.Element;

export declare function MenubarRadioItem({ className, children, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.RadioItem>): JSX.Element;

export declare function MenubarSeparator({ className, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Separator>): JSX.Element;

export declare function MenubarShortcut({ className, ...props }: React_2.ComponentProps<"span">): JSX.Element;

export declare function MenubarSub({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Sub>): JSX.Element;

export declare function MenubarSubContent({ className, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.SubContent>): JSX.Element;

export declare function MenubarSubTrigger({ className, inset, children, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
}): JSX.Element;

export declare function MenubarTrigger({ className, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Trigger>): JSX.Element;

export declare const MultiSelect: React_2.ForwardRefExoticComponent<MultiSelectProps & React_2.RefAttributes<HTMLButtonElement>>;

/**
 * Props for MultiSelect component
 */
declare interface MultiSelectProps extends React_2.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof multiSelectVariants> {
    /**
     * An array of option objects to be displayed in the multi-select component.
     * Each option object has a label, value, and an optional icon.
     */
    options: {
        /** The text to display for the option. */
        label: string;
        /** The unique value associated with the option. */
        value: string;
        /** Optional icon component to display alongside the option. */
        icon?: React_2.ComponentType<{
            className?: string;
        }>;
    }[];
    /**
     * Callback function triggered when the selected values change.
     * Receives an array of the new selected values.
     */
    onValueChange: (value: string[]) => void;
    /** The default selected values when the component mounts. */
    defaultValue?: string[];
    /**
     * Placeholder text to be displayed when no values are selected.
     * Optional, defaults to "Select options".
     */
    placeholder?: string;
    /**
     * Animation duration in seconds for the visual effects (e.g., bouncing badges).
     * Optional, defaults to 0 (no animation).
     */
    animation?: number;
    /**
     * Maximum number of items to display. Extra selected items will be summarized.
     * Optional, defaults to 3.
     */
    maxCount?: number;
    /**
     * The modality of the popover. When set to true, interaction with outside elements
     * will be disabled and only popover content will be visible to screen readers.
     * Optional, defaults to false.
     */
    modalPopover?: boolean;
    /**
     * If true, renders the multi-select component as a child of another component.
     * Optional, defaults to false.
     */
    asChild?: boolean;
    /**
     * Additional class names to apply custom styles to the multi-select component.
     * Optional, can be used to add custom styles.
     */
    className?: string;
    /**
     * The value of the multi-select component, controlled by the form.
     */
    formValue?: string[];
}

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
declare const multiSelectVariants: (props?: ({
    variant?: "default" | "destructive" | "secondary" | "inverted" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function NavigationMenu({ className, children, viewport, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean;
}): JSX.Element;

export declare function NavigationMenuContent({ className, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Content>): JSX.Element;

export declare function NavigationMenuIndicator({ className, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Indicator>): JSX.Element;

export declare function NavigationMenuItem({ className, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Item>): JSX.Element;

export declare function NavigationMenuLink({ className, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Link>): JSX.Element;

export declare function NavigationMenuList({ className, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.List>): JSX.Element;

export declare function NavigationMenuTrigger({ className, children, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Trigger>): JSX.Element;

export declare const navigationMenuTriggerStyle: (props?: ClassProp | undefined) => string;

export declare function NavigationMenuViewport({ className, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Viewport>): JSX.Element;

export declare function Pagination({ className, ...props }: React_2.ComponentProps<"nav">): JSX.Element;

export declare function PaginationContent({ className, ...props }: React_2.ComponentProps<"ul">): JSX.Element;

export declare function PaginationEllipsis({ className, ...props }: React_2.ComponentProps<"span">): JSX.Element;

export declare function PaginationItem({ ...props }: React_2.ComponentProps<"li">): JSX.Element;

export declare function PaginationLink({ className, isActive, size, ...props }: PaginationLinkProps): JSX.Element;

declare type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React_2.ComponentProps<typeof Button>, "size"> & React_2.ComponentProps<"a">;

export declare function PaginationNext({ className, ...props }: React_2.ComponentProps<typeof PaginationLink>): JSX.Element;

export declare function PaginationPrevious({ className, ...props }: React_2.ComponentProps<typeof PaginationLink>): JSX.Element;

export declare function Popover({ ...props }: React_2.ComponentProps<typeof PopoverPrimitive.Root>): JSX.Element;

export declare function PopoverAnchor({ ...props }: React_2.ComponentProps<typeof PopoverPrimitive.Anchor>): JSX.Element;

export declare function PopoverContent({ className, align, sideOffset, ...props }: React_2.ComponentProps<typeof PopoverPrimitive.Content>): JSX.Element;

export declare function PopoverTrigger({ ...props }: React_2.ComponentProps<typeof PopoverPrimitive.Trigger>): JSX.Element;

export declare function Progress({ className, value, ...props }: React_2.ComponentProps<typeof ProgressPrimitive.Root>): JSX.Element;

export declare function RadioGroup({ className, ...props }: React_2.ComponentProps<typeof RadioGroupPrimitive.Root>): JSX.Element;

export declare function RadioGroupItem({ className, ...props }: React_2.ComponentProps<typeof RadioGroupPrimitive.Item>): JSX.Element;

export declare function ResizableHandle({ withHandle, className, ...props }: React_2.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean;
}): JSX.Element;

export declare function ResizablePanel({ ...props }: React_2.ComponentProps<typeof ResizablePrimitive.Panel>): JSX.Element;

export declare function ResizablePanelGroup({ className, ...props }: React_2.ComponentProps<typeof ResizablePrimitive.PanelGroup>): JSX.Element;

export declare function ScrollArea({ className, children, ...props }: React_2.ComponentProps<typeof ScrollAreaPrimitive.Root>): JSX.Element;

export declare function ScrollBar({ className, orientation, ...props }: React_2.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>): JSX.Element;

export declare function Select({ ...props }: React_2.ComponentProps<typeof SelectPrimitive.Root>): JSX.Element;

/**
 * Props for SelectComponent
 */
declare interface SelectComponentProps extends React_2.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof selectVariants> {
    /**
     * An array of option objects to be displayed in the select component.
     */
    options: {
        /** The text to display for the option. */
        label: string;
        /** The unique value associated with the option. */
        value: string;
        /** Optional icon component to display alongside the option. */
        icon?: React_2.ComponentType<{
            className?: string;
        }>;
    }[];
    /**
     * Callback function triggered when the selected value changes.
     * Receives the new selected value.
     */
    onValueChange: (value: string) => void;
    /** The current selected value. */
    value?: string;
    /** The default selected value when the component mounts. */
    defaultValue?: string;
    /**
     * Placeholder text to be displayed when no value is selected.
     * Optional, defaults to "Select an option".
     */
    placeholder?: string;
    /**
     * The modality of the popover. When set to true, interaction with outside elements
     * will be disabled and only popover content will be visible to screen readers.
     * Optional, defaults to false.
     */
    modalPopover?: boolean;
    /**
     * If true, renders the select component as a child of another component.
     * Optional, defaults to false.
     */
    asChild?: boolean;
    /**
     * Additional class names to apply custom styles to the select component.
     */
    className?: string;
    /**
     * Whether the component is in a loading state
     * Optional, defaults to false
     */
    isLoading?: boolean;
    /**
     * Whether the component encountered an error
     * Optional, defaults to false
     */
    isError?: boolean;
    /**
     * Custom error message to display
     * Optional
     */
    errorMessage?: string;
    /**
     * Custom no options message
     * Optional
     */
    noOptionsMessage?: string;
}

export declare function SelectContent({ className, children, position, ...props }: React_2.ComponentProps<typeof SelectPrimitive.Content>): JSX.Element;

export declare function SelectGroup({ ...props }: React_2.ComponentProps<typeof SelectPrimitive.Group>): JSX.Element;

export declare function SelectItem({ className, children, ...props }: React_2.ComponentProps<typeof SelectPrimitive.Item>): JSX.Element;

export declare function SelectLabel({ className, ...props }: React_2.ComponentProps<typeof SelectPrimitive.Label>): JSX.Element;

export declare function SelectScrollDownButton({ className, ...props }: React_2.ComponentProps<typeof SelectPrimitive.ScrollDownButton>): JSX.Element;

export declare function SelectScrollUpButton({ className, ...props }: React_2.ComponentProps<typeof SelectPrimitive.ScrollUpButton>): JSX.Element;

export declare function SelectSeparator({ className, ...props }: React_2.ComponentProps<typeof SelectPrimitive.Separator>): JSX.Element;

export declare function SelectTrigger({ className, size, children, ...props }: React_2.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: "sm" | "default";
}): JSX.Element;

export declare function SelectValue({ ...props }: React_2.ComponentProps<typeof SelectPrimitive.Value>): JSX.Element;

/**
 * Variants for the select component to handle different styles.
 */
declare const selectVariants: (props?: ({
    variant?: "default" | "destructive" | "secondary" | "error" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Separator({ className, orientation, decorative, ...props }: React_2.ComponentProps<typeof SeparatorPrimitive.Root>): JSX.Element;

export declare function Sheet({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Root>): JSX.Element;

export declare function SheetClose({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Close>): JSX.Element;

export declare function SheetContent({ className, children, side, ...props }: React_2.ComponentProps<typeof DialogPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
}): JSX.Element;

export declare function SheetDescription({ className, ...props }: React_2.ComponentProps<typeof DialogPrimitive.Description>): JSX.Element;

export declare function SheetFooter({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function SheetHeader({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function SheetTitle({ className, ...props }: React_2.ComponentProps<typeof DialogPrimitive.Title>): JSX.Element;

export declare function SheetTrigger({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Trigger>): JSX.Element;

export declare function Sidebar({ side, variant, collapsible, className, children, ...props }: React_2.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
}): JSX.Element;

export declare function SidebarContent({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

declare type SidebarContextProps = {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};

export declare function SidebarFooter({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function SidebarGroup({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function SidebarGroupAction({ className, asChild, ...props }: React_2.ComponentProps<"button"> & {
    asChild?: boolean;
}): JSX.Element;

export declare function SidebarGroupContent({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function SidebarGroupLabel({ className, asChild, ...props }: React_2.ComponentProps<"div"> & {
    asChild?: boolean;
}): JSX.Element;

export declare function SidebarHeader({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function SidebarInput({ className, ...props }: React_2.ComponentProps<typeof Input>): JSX.Element;

export declare function SidebarInset({ className, ...props }: React_2.ComponentProps<"main">): JSX.Element;

export declare function SidebarMenu({ className, ...props }: React_2.ComponentProps<"ul">): JSX.Element;

export declare function SidebarMenuAction({ className, asChild, showOnHover, ...props }: React_2.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
}): JSX.Element;

export declare function SidebarMenuBadge({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function SidebarMenuButton({ asChild, isActive, variant, size, tooltip, className, ...props }: React_2.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React_2.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>): JSX.Element;

declare const sidebarMenuButtonVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function SidebarMenuItem({ className, ...props }: React_2.ComponentProps<"li">): JSX.Element;

export declare function SidebarMenuSkeleton({ className, showIcon, ...props }: React_2.ComponentProps<"div"> & {
    showIcon?: boolean;
}): JSX.Element;

export declare function SidebarMenuSub({ className, ...props }: React_2.ComponentProps<"ul">): JSX.Element;

export declare function SidebarMenuSubButton({ asChild, size, isActive, className, ...props }: React_2.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
}): JSX.Element;

export declare function SidebarMenuSubItem({ className, ...props }: React_2.ComponentProps<"li">): JSX.Element;

export declare function SidebarProvider({ defaultOpen, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }: React_2.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}): JSX.Element;

export declare function SidebarRail({ className, ...props }: React_2.ComponentProps<"button">): JSX.Element;

export declare function SidebarSeparator({ className, ...props }: React_2.ComponentProps<typeof Separator>): JSX.Element;

export declare function SidebarTrigger({ className, onClick, ...props }: React_2.ComponentProps<typeof Button>): JSX.Element;

export declare function Skeleton({ className, ...props }: React.ComponentProps<"div">): JSX.Element;

export declare function Switch({ className, ...props }: React_2.ComponentProps<typeof SwitchPrimitive.Root>): JSX.Element;

export declare function Table({ className, ...props }: React_2.ComponentProps<"table">): JSX.Element;

export declare function TableBody({ className, ...props }: React_2.ComponentProps<"tbody">): JSX.Element;

export declare function TableCaption({ className, ...props }: React_2.ComponentProps<"caption">): JSX.Element;

export declare function TableCell({ className, ...props }: React_2.ComponentProps<"td">): JSX.Element;

export declare function TableFooter({ className, ...props }: React_2.ComponentProps<"tfoot">): JSX.Element;

export declare function TableHead({ className, ...props }: React_2.ComponentProps<"th">): JSX.Element;

export declare function TableHeader({ className, ...props }: React_2.ComponentProps<"thead">): JSX.Element;

export declare function TableRow({ className, ...props }: React_2.ComponentProps<"tr">): JSX.Element;

export declare function Tabs({ className, ...props }: React_2.ComponentProps<typeof TabsPrimitive.Root>): JSX.Element;

export declare function TabsContent({ className, ...props }: React_2.ComponentProps<typeof TabsPrimitive.Content>): JSX.Element;

export declare function TabsList({ className, ...props }: React_2.ComponentProps<typeof TabsPrimitive.List>): JSX.Element;

export declare function TabsTrigger({ className, ...props }: React_2.ComponentProps<typeof TabsPrimitive.Trigger>): JSX.Element;

export declare function Textarea({ className, ...props }: React_2.ComponentProps<"textarea">): JSX.Element;

declare type Theme = "dark" | "light" | "system";

export declare function ThemeProvider({ children, defaultTheme, storageKey, ...props }: ThemeProviderProps): JSX.Element;

declare type ThemeProviderProps = {
    children: React_2.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};

export declare const Toaster: ({ ...props }: ToasterProps) => JSX.Element;

export declare function Toggle({ className, variant, size, ...props }: React_2.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>): JSX.Element;

export declare function ToggleGroup({ className, variant, size, children, ...props }: React_2.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>): JSX.Element;

export declare function ToggleGroupItem({ className, children, variant, size, ...props }: React_2.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>): JSX.Element;

export declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Tooltip({ ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Root>): JSX.Element;

export declare function TooltipContent({ className, sideOffset, children, ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Content>): JSX.Element;

export declare function TooltipProvider({ delayDuration, ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Provider>): JSX.Element;

export declare function TooltipTrigger({ ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Trigger>): JSX.Element;

export declare function transformToSelectOptions<T extends Record<string, any>>(data: T[], labelField: keyof T, valueField?: keyof T): {
    value: string;
    label: string;
}[];

declare type UseCarouselParameters = Parameters<typeof default_2>;

export declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};

export declare function useSidebar(): SidebarContextProps;

export declare const useTheme: () => ThemeProviderState;

export { }
