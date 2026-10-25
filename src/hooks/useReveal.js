import { useEffect } from 'react'

// Fades `.rv` elements in as they scroll into view.
export function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add('js')
    document.body.classList.add('js')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.rv').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 70}ms`
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])
}
