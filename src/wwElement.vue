<template>
  <div :class="badgeClasses">
    <component
      v-if="icon && iconPosition === 'left'"
      :is="icon"
      class="badge-icon badge-icon-left"
    />
    
    <span v-if="text">
      {{ text }}
    </span>
    
    <slot v-else />
    
    <component
      v-if="icon && iconPosition === 'right'"
      :is="icon"
      class="badge-icon badge-icon-right"
    />
    
    <button
      v-if="dismissible"
      @click="handleDismiss"
      class="badge-dismiss"
      type="button"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'WewebBadge',
  props: {
        // Individual props will be auto-generated based on the component type
        // This is a placeholder that will be manually refined per component
    },
  emits: ['dismiss'],
  setup(props, { emit }) {
    // Computed classes based on variants (CSS Vanilla)
    const badgeClasses = computed(() => {
      const variant = props.variant || 'default'
      const size = props.size || 'default'
      
      const classes = [
        'badge-base',
        `badge-variant-${variant}`
      ]
      
      if (size !== 'default') {
        classes.push(`badge-size-${size}`)
      }
      
      if (props.customClasses) {
        classes.push(props.customClasses)
      }
      
      return classes.join(' ')
    })

    // Dismiss handler
    const handleDismiss = (event) => {
      emit('dismiss', event)
      
      // Execute Weweb workflow if defined
      if (props.dismissWorkflowId && typeof wwLib !== 'undefined') {
        wwLib.executeWorkflow(props.dismissWorkflowId)
      }
    }

    return {
      badgeClasses,
      handleDismiss
    }
  }
}
</script>

<style scoped>
/* Variables CSS Shadcn/UI */
:root {
  --primary: hsl(222.2, 47.4%, 11.2%);
  --primary-foreground: hsl(210, 40%, 98%);
  --secondary: hsl(210, 40%, 96%);
  --secondary-foreground: hsl(222.2, 84%, 4.9%);
  --destructive: hsl(0, 84.2%, 60.2%);
  --destructive-foreground: hsl(210, 40%, 98%);
  --border: hsl(214.3, 31.8%, 91.4%);
}

/* Badge base styles */
.badge-base {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  white-space: nowrap;
}

/* Variant styles */
.badge-variant-default {
  background-color: var(--primary);
  color: var(--primary-foreground);
  padding: 4px 10px;
}

.badge-variant-secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
  padding: 4px 10px;
}

.badge-variant-destructive {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
  padding: 4px 10px;
}

.badge-variant-outline {
  background-color: transparent;
  color: var(--primary);
  border: 1px solid var(--border);
  padding: 3px 9px;
}

/* Size variants */
.badge-size-sm {
  font-size: 11px;
  padding: 2px 6px;
}

.badge-size-lg {
  font-size: 13px;
  padding: 6px 12px;
}

/* Icon styles */
.badge-icon {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

.badge-icon-left {
  margin-right: 4px;
}

.badge-icon-right {
  margin-left: 4px;
}

/* Dismiss button */
.badge-dismiss {
  margin-left: 4px;
  border-radius: 50%;
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in-out;
}

.badge-dismiss:hover {
  opacity: 0.8;
}

.badge-dismiss:focus {
  outline: 2px solid currentColor;
  outline-offset: 1px;
}
</style> 