<template>
  <div :class="badgeClasses" @click="handleClick">
    <!-- Icon Left -->
    <i 
      v-if="content.showIcon && content.iconPosition === 'left' && content.iconName" 
      :data-lucide="content.iconName" 
      class="badge-icon badge-icon-left"
    ></i>
    
    <!-- Text Content -->
    <span v-if="content.text">
      {{ content.text }}
    </span>
    
    <slot v-else />
    
    <!-- Icon Right -->
    <i 
      v-if="content.showIcon && content.iconPosition === 'right' && content.iconName" 
      :data-lucide="content.iconName" 
      class="badge-icon badge-icon-right"
    ></i>
    
    <!-- Dismiss Button -->
    <button
      v-if="content.dismissible"
      @click="handleDismiss"
      class="badge-dismiss"
      type="button"
      aria-label="Close badge"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'

export default {
  name: 'ShadcnBadge',
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({
        text: "Badge",
        variant: "default",
        size: "default",
        dismissible: false,
        showIcon: false,
        iconName: "star",
        iconPosition: "left"
      })
    },
    wwEditorState: { type: Object, required: true }
  },
  emits: ['trigger-event', 'dismiss'],
  setup(props, { emit }) {
    // Load Lucide icons on mount
    onMounted(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons()
      } else {
        // Load Lucide if not available
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.js'
        script.onload = () => {
          if (typeof lucide !== 'undefined') {
            lucide.createIcons()
          }
        }
        document.head.appendChild(script)
      }
    })

    const badgeClasses = computed(() => {
      const variant = props.content.variant || 'default'
      const size = props.content.size || 'default'
      
      const classes = [
        'badge-base',
        `badge-variant-${variant}`
      ]
      
      if (size !== 'default') {
        classes.push(`badge-size-${size}`)
      }
      
      return classes.join(' ')
    })

    const handleClick = (event) => {
      emit('trigger-event', {
        domEvent: event,
        value: {
          text: props.content.text,
          variant: props.content.variant,
          content: props.content
        }
      })
    }

    const handleDismiss = (event) => {
      event.stopPropagation() // Prevent triggering click event
      
      const eventData = {
        text: props.content.text,
        content: props.content
      }
      
      emit('dismiss', { domEvent: event, value: eventData })
      emit('trigger-event', { 
        domEvent: event, 
        value: { event: 'dismiss', ...eventData } 
      })
    }

    return {
      badgeClasses,
      handleClick,
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
  --foreground: hsl(222.2, 84%, 4.9%);
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
  cursor: pointer;
  padding: 4px 10px;
}

.badge-base:hover {
  opacity: 0.8;
}

/* Variant styles */
.badge-variant-default {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.badge-variant-secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.badge-variant-destructive {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}

.badge-variant-outline {
  background-color: transparent;
  color: var(--foreground);
  border: 1px solid var(--border);
  padding: 3px 9px;
}

.badge-variant-success {
  background-color: hsl(140, 84%, 39%);
  color: hsl(210, 40%, 98%);
}

.badge-variant-warning {
  background-color: hsl(38, 92%, 50%);
  color: hsl(25, 95%, 15%);
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

/* Adjust outline padding for different sizes */
.badge-size-sm.badge-variant-outline {
  padding: 1px 5px;
}

.badge-size-lg.badge-variant-outline {
  padding: 5px 11px;
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

/* Size-specific icon adjustments */
.badge-size-sm .badge-icon {
  width: 10px;
  height: 10px;
}

.badge-size-lg .badge-icon {
  width: 14px;
  height: 14px;
}

/* Dismiss button */
.badge-dismiss {
  margin-left: 4px;
  border-radius: 50%;
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  padding: 1px;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in-out;
}

.badge-dismiss:hover {
  opacity: 0.7;
  background-color: rgba(255, 255, 255, 0.2);
}

.badge-dismiss:focus {
  outline: 2px solid currentColor;
  outline-offset: 1px;
}

/* Size-specific dismiss button adjustments */
.badge-size-sm .badge-dismiss {
  width: 12px;
  height: 12px;
}

.badge-size-lg .badge-dismiss {
  width: 16px;
  height: 16px;
}
</style>