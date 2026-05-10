"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);

  const rotate    = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale     = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="container-scroll-root"
      ref={containerRef}
      style={{
        height: '72rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', padding: '1rem',
      }}
    >
      <div
        style={{
          padding: '2.5rem 0 10rem',
          width: '100%', position: 'relative',
          perspective: '1000px',
        }}
      >
        {/* Header */}
        <motion.div
          style={{ translateY: translate }}
          className="container-scroll-header"
        >
          {titleComponent}
        </motion.div>

        {/* Card */}
        <motion.div
          style={{
            rotateX: rotate, scale,
            boxShadow:
              '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
            marginTop: '-3rem',
            marginLeft: 'auto', marginRight: 'auto',
            maxWidth: '64rem',
            height: '34rem',
            width: '100%',
            border: '4px solid #3a3a3a',
            padding: '0.5rem',
            background: '#181818',
            borderRadius: '2rem',
          }}
        >
          <div style={{
            height: '100%', width: '100%',
            overflow: 'hidden', borderRadius: '1.25rem',
            background: '#111',
          }}>
            {children}
          </div>
        </motion.div>
      </div>

      <style>{`
        .container-scroll-root {
          @media (min-width: 768px) {
            height: 80rem;
            padding: 5rem;
          }
        }
        .container-scroll-header {
          max-width: 64rem;
          margin: 0 auto;
          text-align: center;
        }
      `}</style>
    </div>
  );
};