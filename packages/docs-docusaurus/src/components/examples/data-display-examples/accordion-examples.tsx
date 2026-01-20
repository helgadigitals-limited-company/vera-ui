"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@helgadigitals/vera-ui";

export function BasicAccordionExample() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and uses semantic HTML.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match your theme and can be
          customized.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function MultipleAccordionExample() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Learn the basics of our platform with these essential steps:</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Create your account</li>
              <li>Complete your profile</li>
              <li>Set up your preferences</li>
              <li>Explore the dashboard</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Account Settings</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Manage your account settings including:</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Profile information</li>
              <li>Privacy settings</li>
              <li>Notification preferences</li>
              <li>Security options</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Billing & Payments</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Handle your billing and payment information:</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>View current plan</li>
              <li>Update payment methods</li>
              <li>Download invoices</li>
              <li>Manage subscriptions</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function DisabledAccordionExample() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Available Section</AccordionTrigger>
        <AccordionContent>
          This section is fully interactive and can be expanded or collapsed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled Section</AccordionTrigger>
        <AccordionContent>
          This content won&apos;t be accessible because the item is disabled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another Available Section</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>
              This section is also interactive. Disabled items are useful for:
            </p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Premium features requiring upgrades</li>
              <li>Temporarily unavailable content</li>
              <li>Conditional access based on user permissions</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
