'use client';

import  { useRef, useEffect} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedSection = ({ children, animationType="fadeup", delay=0, ...restProps }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;

        if(!el) return;

        let ctx = gsap.context(() => {
            let anim;

            switch(animationType) {
                case 'fadeLeft':
                        anim = gsap.from(el,{
                        x: -100, 
                        autoAlpha: 0, 
                        duration: 1,
                        delay: delay,
                        scrollTrigger: {
                        trigger: el,
                        start: 'top 85%', 
                        toggleActions: 'play pause resume reset', 
                        },
                    });
                    break;
                case 'fadeRight' :
                        anim = gsap.from(el, {
                        x: 100, 
                        autoAlpha: 0,
                        duration: 1,
                        delay: delay,
                        scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play pause resume reset',
                        },
                    });
                    break;
                case 'fadeUp' : 
                default : 
                        anim = gsap.from(el ,{
                        y: 50, 
                        autoAlpha: 0,
                        duration: 1,
                        delay: delay,
                        scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play pause resume reset',
                        },
                    });
                    break;
            }
        }, sectionRef)

        return () => ctx.revert();
    }, [animationType,delay])

    return (
        <div ref={sectionRef} style={{overflow:'hidden'}} {...restProps}>
            {children}
        </div>
    )
}

export default AnimatedSection;