export default {
    editor: {
        label: 'Shadcn Badge',
        icon: 'tag',
    },
    triggerEvents: [
        { name: 'click', label: 'On Click', event: { value: '' }, default: true },
        { name: 'dismiss', label: 'On Dismiss', event: { value: '' } },
    ],
    properties: {
        content: {
            label: 'Badge Settings',
            type: 'Object',
            section: 'settings',
            bindable: true,
            defaultValue: {
                text: 'Badge',
                variant: 'default',
                size: 'default',
                icon: null,
                iconPosition: 'left',
                dismissible: false,
                customClasses: ''
            },
            options: {
                item: {
                    text: {
                        label: 'Text',
                        type: 'Text',
                        section: 'settings',
                        bindable: true,
                        defaultValue: 'Badge'
                    },
                    variant: {
                        label: 'Variant',
                        type: 'TextSelect',
                        section: 'settings',
                        options: {
                            choices: [
                                { value: 'default', label: 'Default' },
                                { value: 'secondary', label: 'Secondary' },
                                { value: 'destructive', label: 'Destructive' },
                                { value: 'outline', label: 'Outline' }
                            ]
                        },
                        defaultValue: 'default'
                    },
                    size: {
                        label: 'Size',
                        type: 'TextSelect',
                        section: 'settings',
                        options: {
                            choices: [
                                { value: 'default', label: 'Default' },
                                { value: 'sm', label: 'Small' },
                                { value: 'lg', label: 'Large' }
                            ]
                        },
                        defaultValue: 'default'
                    },
                    dismissible: {
                        label: 'Dismissible',
                        type: 'OnOff',
                        section: 'settings',
                        defaultValue: false
                    },
                    customClasses: {
                        label: 'Custom Classes',
                        type: 'Text',
                        section: 'style',
                        bindable: true,
                        defaultValue: ''
                    }
                }
            }
        }
    }
};
