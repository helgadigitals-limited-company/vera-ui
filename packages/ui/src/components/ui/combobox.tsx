import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, ChevronDown, XIcon, Loader2, AlertCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * Variants for the select component to handle different styles.
 */
const selectVariants = cva('transition ease-in-out duration-200', {
  variants: {
    variant: {
      default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
      secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      error: 'border-destructive/50 bg-destructive/10 text-destructive hover:bg-destructive/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Props for SelectComponent
 */
interface SelectComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof selectVariants> {
  /**
   * An array of option objects to be displayed in the select component.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
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

export const Combobox = React.forwardRef<HTMLButtonElement, SelectComponentProps>(
  (
    {
      options,
      onValueChange,
      value,
      defaultValue = '',
      placeholder = 'Select an option',
      modalPopover = false,
      className,
      variant,
      isLoading = false,
      isError = false,
      errorMessage = 'Failed to load options',
      noOptionsMessage = 'No options available',
      disabled,
      ...props
    },
    ref
  ) => {
    // Use controlled or uncontrolled pattern based on whether value is provided
    const [selectedValue, setSelectedValue] = React.useState<string>(value || defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    // Update internal state when controlled value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    // Find the selected option object
    const selectedOption = options.find((option) => option.value === selectedValue);

    // Determine component state
    const isEmpty = options.length === 0 && !isLoading && !isError;
    const isDisabled = disabled || isLoading || isError || isEmpty;

    // Determine which variant to use
    const currentVariant = isError ? 'error' : variant;

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value && selectedValue) {
        setSelectedValue('');
        onValueChange('');
      }
    };

    const handleSelectOption = (option: string) => {
      setSelectedValue(option);
      onValueChange(option);
      setIsPopoverOpen(false);
    };

    const handleClear = (event: React.MouseEvent) => {
      event.stopPropagation();
      setSelectedValue('');
      onValueChange('');
    };

    const handleTogglePopover = () => {
      if (!isDisabled) {
        setIsPopoverOpen((prev) => !prev);
      }
    };

    // Render button content based on component state
    const renderButtonContent = () => {
      if (isLoading) {
        return (
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-muted-foreground flex items-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Loading options...
            </span>
          </div>
        );
      }

      if (isError) {
        return (
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-destructive flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {errorMessage}
            </span>
          </div>
        );
      }

      if (isEmpty) {
        return (
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-muted-foreground">{noOptionsMessage}</span>
          </div>
        );
      }

      if (selectedValue) {
        return (
          <div className="flex justify-between items-center w-full min-w-0">
            <div className="flex items-center min-w-0 flex-1">
              {selectedOption?.icon && <selectedOption.icon className="h-4 w-4 mr-2" />}
              <span
                className="truncate block max-w-[10rem] sm:max-w-[12rem] md:max-w-[14rem] lg:max-w-[16rem]"
                title={selectedOption?.label}
              >
                {selectedOption?.label}
              </span>
            </div>
            <div className="flex items-center flex-shrink-0 ml-2">
              <XIcon className="h-4 w-4 mr-2 cursor-pointer text-muted-foreground" onClick={handleClear} />
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        );
      }

      return (
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-muted-foreground ">{placeholder}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      );
    };

    return (
      <TooltipProvider>
        <Popover open={isPopoverOpen} onOpenChange={isDisabled ? undefined : setIsPopoverOpen} modal={modalPopover}>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div>
                <PopoverTrigger asChild>
                  <Button
                    ref={ref}
                    {...props}
                    type="button"
                    onClick={handleTogglePopover}
                    disabled={isDisabled}
                    className={cn(
                      'flex w-full p-3 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto',
                      selectVariants({ variant: currentVariant }),
                      {
                        'opacity-80 cursor-not-allowed': isDisabled,
                        'opacity-100': !isDisabled,
                      },
                      className
                    )}
                  >
                    {renderButtonContent()}
                  </Button>
                </PopoverTrigger>
              </div>
            </TooltipTrigger>

            {isError && (
              <TooltipContent>
                <p>{errorMessage}</p>
              </TooltipContent>
            )}
          </Tooltip>

          {!isDisabled && (
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
              onEscapeKeyDown={() => setIsPopoverOpen(false)}
            >
              <Command>
                <CommandInput placeholder="Search..." onKeyDown={handleInputKeyDown} />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => {
                      const isSelected = selectedValue === option.value;
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => handleSelectOption(option.value)}
                          className="cursor-pointer"
                        >
                          <div
                            className={cn(
                              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                              isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
                            )}
                          >
                            <CheckIcon className="h-4 w-4" />
                          </div>
                          {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                          <span>{option.label}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          )}
        </Popover>
      </TooltipProvider>
    );
  }
);

Combobox.displayName = 'Combobox';