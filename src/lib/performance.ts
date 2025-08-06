// Performance monitoring and optimization utilities

interface WebVitalMetric {
  id: string
  name: string
  value: number
  label: 'web-vital' | 'custom'
  startTime?: number
  entries?: PerformanceEntry[]
}

export function reportWebVitals(metric: WebVitalMetric) {
  // You can send the metric to an analytics service here
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric)
  }
  
  // Example: Send to analytics service
  // gtag('event', metric.name, {
  //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //   event_label: metric.id,
  //   non_interaction: true,
  // })
}

// Preload critical resources
export function preloadImage(src: string): void {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  }
}

// Optimize image loading
export function getOptimizedImageUrl(src: string, width: number, height: number, quality = 75): string {
  if (src.includes('unsplash.com')) {
    return `${src}&w=${width}&h=${height}&fit=crop&auto=format&q=${quality}`
  }
  return src
}

// Debounce utility for performance
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility for performance
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Intersection Observer for lazy loading
export function createLazyLoadObserver(callback: (entry: IntersectionObserverEntry) => void) {
  if (typeof window === 'undefined') return null
  
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback)
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01
    }
  )
}