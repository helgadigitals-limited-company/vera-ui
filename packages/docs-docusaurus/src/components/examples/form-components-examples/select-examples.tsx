"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { User, Mail, Phone, MessageSquare } from "lucide-react"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  Button 
} from "@helgadigitals/vera-ui"

export function ControlledSelectExample() {
  const [selectedValue, setSelectedValue] = useState("")

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Choose a country</label>
        <Select value={selectedValue} onValueChange={setSelectedValue}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {selectedValue && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedValue}
        </p>
      )}
    </div>
  )
}

export function GroupedSelectExample() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Choose a programming language</label>
      <Select>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frontend</SelectLabel>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
          </SelectGroup>
          
          <SelectSeparator />
          
          <SelectGroup>
            <SelectLabel>Backend</SelectLabel>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
          </SelectGroup>
          
          <SelectSeparator />
          
          <SelectGroup>
            <SelectLabel>Mobile</SelectLabel>
            <SelectItem value="swift">Swift</SelectItem>
            <SelectItem value="kotlin">Kotlin</SelectItem>
            <SelectItem value="dart">Dart</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export function SizesSelectExample() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Small Select</label>
        <Select>
          <SelectTrigger size="sm" className="w-[150px]">
            <SelectValue placeholder="Small" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Default Select</label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export function DisabledSelectExample() {
  return (
    <div className="space-y-6">
      {/* Disabled select */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Disabled Select</label>
        <Select disabled>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Disabled select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Individual disabled items */}
      <div className="space-y-2">
        <label className="text-sm font-medium">With Disabled Items</label>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available1">Available Option 1</SelectItem>
            <SelectItem value="disabled" disabled>
              Disabled Option
            </SelectItem>
            <SelectItem value="available2">Available Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export function WithIconsSelectExample() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Contact method</label>
      <Select>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Choose contact method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="email">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </SelectItem>
          <SelectItem value="phone">
            <Phone className="mr-2 h-4 w-4" />
            Phone
          </SelectItem>
          <SelectItem value="message">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </SelectItem>
          <SelectItem value="in-person">
            <User className="mr-2 h-4 w-4" />
            In Person
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export function FormIntegrationSelectExample() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      country: "",
      theme: "system"
    }
  })

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data)
    alert(`Form submitted! Country: ${data.country}, Theme: ${data.theme}`)
  }

  const watchedValues = watch()

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Country *</label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Please select a country" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && (
            <p className="text-sm text-destructive">
              {errors.country.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Theme preference</label>
          <Controller
            name="theme"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>

      <div className="mt-4 p-3 bg-muted rounded-md">
        <h4 className="text-sm font-medium mb-2">Current Values:</h4>
        <pre className="text-xs">
          {JSON.stringify({
            country: watchedValues.country || "none",
            theme: watchedValues.theme || "none"
          }, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export function LongListSelectExample() {
  const countries = [
    { value: "af", label: "Afghanistan" },
    { value: "al", label: "Albania" },
    { value: "dz", label: "Algeria" },
    { value: "ad", label: "Andorra" },
    { value: "ao", label: "Angola" },
    { value: "ar", label: "Argentina" },
    { value: "am", label: "Armenia" },
    { value: "au", label: "Australia" },
    { value: "at", label: "Austria" },
    { value: "az", label: "Azerbaijan" },
    { value: "bs", label: "Bahamas" },
    { value: "bh", label: "Bahrain" },
    { value: "bd", label: "Bangladesh" },
    { value: "bb", label: "Barbados" },
    { value: "by", label: "Belarus" },
    { value: "be", label: "Belgium" },
    { value: "bz", label: "Belize" },
    { value: "bj", label: "Benin" },
    { value: "bt", label: "Bhutan" },
    { value: "bo", label: "Bolivia" },
    { value: "ba", label: "Bosnia and Herzegovina" },
    { value: "bw", label: "Botswana" },
    { value: "br", label: "Brazil" },
    { value: "bn", label: "Brunei" },
    { value: "bg", label: "Bulgaria" },
    { value: "bf", label: "Burkina Faso" },
    { value: "bi", label: "Burundi" },
    { value: "kh", label: "Cambodia" },
    { value: "cm", label: "Cameroon" },
    { value: "ca", label: "Canada" },
    { value: "cv", label: "Cape Verde" },
    { value: "cf", label: "Central African Republic" },
    { value: "td", label: "Chad" },
    { value: "cl", label: "Chile" },
    { value: "cn", label: "China" },
    { value: "co", label: "Colombia" },
    { value: "km", label: "Comoros" },
    { value: "cg", label: "Congo" },
    { value: "cr", label: "Costa Rica" },
    { value: "ci", label: "Côte d'Ivoire" },
    { value: "hr", label: "Croatia" },
    { value: "cu", label: "Cuba" },
    { value: "cy", label: "Cyprus" },
    { value: "cz", label: "Czech Republic" },
    { value: "dk", label: "Denmark" },
    { value: "dj", label: "Djibouti" },
    { value: "dm", label: "Dominica" },
    { value: "do", label: "Dominican Republic" },
    { value: "ec", label: "Ecuador" },
    { value: "eg", label: "Egypt" },
    { value: "sv", label: "El Salvador" },
    { value: "gq", label: "Equatorial Guinea" },
    { value: "er", label: "Eritrea" },
    { value: "ee", label: "Estonia" },
    { value: "et", label: "Ethiopia" },
    { value: "fj", label: "Fiji" },
    { value: "fi", label: "Finland" },
    { value: "fr", label: "France" },
    { value: "ga", label: "Gabon" },
    { value: "gm", label: "Gambia" },
    { value: "ge", label: "Georgia" },
    { value: "de", label: "Germany" },
    { value: "gh", label: "Ghana" },
    { value: "gr", label: "Greece" },
    { value: "gd", label: "Grenada" },
    { value: "gt", label: "Guatemala" },
    { value: "gn", label: "Guinea" },
    { value: "gw", label: "Guinea-Bissau" },
    { value: "gy", label: "Guyana" },
    { value: "ht", label: "Haiti" },
    { value: "hn", label: "Honduras" },
    { value: "hu", label: "Hungary" },
    { value: "is", label: "Iceland" },
    { value: "in", label: "India" },
    { value: "id", label: "Indonesia" },
    { value: "ir", label: "Iran" },
    { value: "iq", label: "Iraq" },
    { value: "ie", label: "Ireland" },
    { value: "il", label: "Israel" },
    { value: "it", label: "Italy" },
    { value: "jm", label: "Jamaica" },
    { value: "jp", label: "Japan" },
    { value: "jo", label: "Jordan" },
    { value: "kz", label: "Kazakhstan" },
    { value: "ke", label: "Kenya" },
    { value: "ki", label: "Kiribati" },
    { value: "kp", label: "Korea, North" },
    { value: "kr", label: "Korea, South" },
    { value: "kw", label: "Kuwait" },
    { value: "kg", label: "Kyrgyzstan" },
    { value: "la", label: "Laos" },
    { value: "lv", label: "Latvia" },
    { value: "lb", label: "Lebanon" },
    { value: "ls", label: "Lesotho" },
    { value: "lr", label: "Liberia" },
    { value: "ly", label: "Libya" },
    { value: "li", label: "Liechtenstein" },
    { value: "lt", label: "Lithuania" },
    { value: "lu", label: "Luxembourg" },
    { value: "mk", label: "Macedonia" },
    { value: "mg", label: "Madagascar" },
    { value: "mw", label: "Malawi" },
    { value: "my", label: "Malaysia" },
    { value: "mv", label: "Maldives" },
    { value: "ml", label: "Mali" },
    { value: "mt", label: "Malta" },
    { value: "mh", label: "Marshall Islands" },
    { value: "mr", label: "Mauritania" },
    { value: "mu", label: "Mauritius" },
    { value: "mx", label: "Mexico" },
    { value: "fm", label: "Micronesia" },
    { value: "md", label: "Moldova" },
    { value: "mc", label: "Monaco" },
    { value: "mn", label: "Mongolia" },
    { value: "me", label: "Montenegro" },
    { value: "ma", label: "Morocco" },
    { value: "mz", label: "Mozambique" },
    { value: "mm", label: "Myanmar" },
    { value: "na", label: "Namibia" },
    { value: "nr", label: "Nauru" },
    { value: "np", label: "Nepal" },
    { value: "nl", label: "Netherlands" },
    { value: "nz", label: "New Zealand" },
    { value: "ni", label: "Nicaragua" },
    { value: "ne", label: "Niger" },
    { value: "ng", label: "Nigeria" },
    { value: "no", label: "Norway" },
    { value: "om", label: "Oman" },
    { value: "pk", label: "Pakistan" },
    { value: "pw", label: "Palau" },
    { value: "pa", label: "Panama" },
    { value: "pg", label: "Papua New Guinea" },
    { value: "py", label: "Paraguay" },
    { value: "pe", label: "Peru" },
    { value: "ph", label: "Philippines" },
    { value: "pl", label: "Poland" },
    { value: "pt", label: "Portugal" },
    { value: "qa", label: "Qatar" },
    { value: "ro", label: "Romania" },
    { value: "ru", label: "Russia" },
    { value: "rw", label: "Rwanda" },
    { value: "kn", label: "Saint Kitts and Nevis" },
    { value: "lc", label: "Saint Lucia" },
    { value: "vc", label: "Saint Vincent and the Grenadines" },
    { value: "ws", label: "Samoa" },
    { value: "sm", label: "San Marino" },
    { value: "st", label: "São Tomé and Príncipe" },
    { value: "sa", label: "Saudi Arabia" },
    { value: "sn", label: "Senegal" },
    { value: "rs", label: "Serbia" },
    { value: "sc", label: "Seychelles" },
    { value: "sl", label: "Sierra Leone" },
    { value: "sg", label: "Singapore" },
    { value: "sk", label: "Slovakia" },
    { value: "si", label: "Slovenia" },
    { value: "sb", label: "Solomon Islands" },
    { value: "so", label: "Somalia" },
    { value: "za", label: "South Africa" },
    { value: "ss", label: "South Sudan" },
    { value: "es", label: "Spain" },
    { value: "lk", label: "Sri Lanka" },
    { value: "sd", label: "Sudan" },
    { value: "sr", label: "Suriname" },
    { value: "sz", label: "Swaziland" },
    { value: "se", label: "Sweden" },
    { value: "ch", label: "Switzerland" },
    { value: "sy", label: "Syria" },
    { value: "tw", label: "Taiwan" },
    { value: "tj", label: "Tajikistan" },
    { value: "tz", label: "Tanzania" },
    { value: "th", label: "Thailand" },
    { value: "tl", label: "Timor-Leste" },
    { value: "tg", label: "Togo" },
    { value: "to", label: "Tonga" },
    { value: "tt", label: "Trinidad and Tobago" },
    { value: "tn", label: "Tunisia" },
    { value: "tr", label: "Turkey" },
    { value: "tm", label: "Turkmenistan" },
    { value: "tv", label: "Tuvalu" },
    { value: "ug", label: "Uganda" },
    { value: "ua", label: "Ukraine" },
    { value: "ae", label: "United Arab Emirates" },
    { value: "gb", label: "United Kingdom" },
    { value: "us", label: "United States" },
    { value: "uy", label: "Uruguay" },
    { value: "uz", label: "Uzbekistan" },
    { value: "vu", label: "Vanuatu" },
    { value: "va", label: "Vatican City" },
    { value: "ve", label: "Venezuela" },
    { value: "vn", label: "Vietnam" },
    { value: "ye", label: "Yemen" },
    { value: "zm", label: "Zambia" },
    { value: "zw", label: "Zimbabwe" },
  ]

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Country (searchable)</label>
      <Select>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        Type to search through {countries.length} countries
      </p>
    </div>
  )
}