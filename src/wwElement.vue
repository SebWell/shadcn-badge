<template>
  <div :class="badgeClasses">
    <component
      v-if="content.icon && content.iconPosition === 'left'"
      :is="content.icon"
      class="w-3 h-3 mr-1"
    />
    
    <span v-if="content.text">
      {{ content.text }}
    </span>
    
    <slot v-else />
    
    <component
      v-if="content.icon && content.iconPosition === 'right'"
      :is="content.icon"
      class="w-3 h-3 ml-1"
    />
    
    <button
      v-if="content.dismissible"
      @click="handleDismiss"
      class="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
      type="button"
    >
      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { cn } from './cn.js'

// Badge variants configuration
const badgeVariants = {
  base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    variant: {
      default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
}

export default {
  name: 'WewebBadge',
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({
        text: 'Badge',
        variant: 'default',
        icon: null,
        iconPosition: 'left',
        dismissible: false,
        customClasses: ''
      })
    }
  },
  emits: ['dismiss'],
  setup(props, { emit }) {
    // Computed classes based on variants
    const badgeClasses = computed(() => {
      const variant = props.content.variant || badgeVariants.defaultVariants.variant
      
      return cn(
        badgeVariants.base,
        badgeVariants.variants.variant[variant],
        props.content.customClasses
      )
    })

    // Dismiss handler
    const handleDismiss = (event) => {
      emit('dismiss', event)
      
      // Execute Weweb workflow if defined
      if (props.content.dismissWorkflowId && typeof wwLib !== 'undefined') {
        wwLib.executeWorkflow(props.content.dismissWorkflowId)
      }
    }

    return {
      badgeClasses,
      handleDismiss
    }
  }
}
</script>

<style>
/* Import global shadcn/ui styles */
@import './globals.css';
</style> 