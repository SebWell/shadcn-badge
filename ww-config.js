export default {
  editor: {
    label: {
      en: "shadcn Badge",
      fr: "Badge shadcn"
    },
    icon: 'fas fa-tag',
    bubble: {
      icon: 'fas fa-tag'
    },
    deprecated: false
  },
  triggerEvents: [
    {
      name: "dismiss",
      label: { 
        en: "On dismiss", 
        fr: "Au rejet" 
      },
      event: { value: "" },
      default: false
    }
  ],
  properties: {
    text: {
      label: {
        en: "Badge text",
        fr: "Texte du badge"
      },
      type: "Text",
      defaultValue: "Badge",
      bindable: true,
      translatable: true
    },
    variant: {
      label: {
        en: "Variant",
        fr: "Variante"
      },
      type: "TextSelect",
      options: {
        options: [
          { value: "default", label: { en: "Default", fr: "Par défaut" } },
          { value: "secondary", label: { en: "Secondary", fr: "Secondaire" } },
          { value: "destructive", label: { en: "Destructive", fr: "Destructeur" } },
          { value: "outline", label: { en: "Outline", fr: "Contour" } }
        ]
      },
      defaultValue: "default",
      section: "settings"
    },
    icon: {
      label: {
        en: "Icon",
        fr: "Icône"
      },
      type: "Icon",
      bindable: true,
      section: "icon"
    },
    iconPosition: {
      label: {
        en: "Icon position",
        fr: "Position de l'icône"
      },
      type: "TextSelect",
      options: {
        options: [
          { value: "left", label: { en: "Left", fr: "Gauche" } },
          { value: "right", label: { en: "Right", fr: "Droite" } }
        ]
      },
      defaultValue: "left",
      hidden: content => !content.icon,
      section: "icon"
    },
    dismissible: {
      label: {
        en: "Dismissible",
        fr: "Peut être fermé"
      },
      type: "OnOff",
      defaultValue: false,
      section: "interaction"
    },
    dismissWorkflowId: {
      label: {
        en: "Dismiss workflow",
        fr: "Workflow de fermeture"
      },
      type: "Text",
      bindable: true,
      hidden: content => !content.dismissible,
      section: "interaction"
    },
    customClasses: {
      label: {
        en: "Custom CSS classes",
        fr: "Classes CSS personnalisées"
      },
      type: "Text",
      bindable: true,
      section: "style"
    }
  },
  sections: {
    settings: {
      label: { en: "Badge Settings", fr: "Paramètres du badge" },
      expand: true
    },
    icon: {
      label: { en: "Icon", fr: "Icône" },
      expand: false
    },
    interaction: {
      label: { en: "Interaction", fr: "Interaction" },
      expand: false
    },
    style: {
      label: { en: "Style", fr: "Style" },
      expand: false
    }
  }
}; 