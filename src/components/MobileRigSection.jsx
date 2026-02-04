import React from 'react';
import { motion } from 'framer-motion';

const MobileRigSection = () => (
  <section className="py-16 bg-card">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img 
            alt="Riotous Car Care Mobile Detailing Rig in a sleek industrial setting"
            className="rounded-xl shadow-2xl"
           src="https://images.unsplash.com/photo-1696315072627-8efcce451f4e" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-primary mb-4">The Shop That Comes to You</h2>
          <p className="text-gray-300 leading-relaxed">
            Our state-of-the-art mobile detailing rig is a complete, self-sufficient shop on wheels. It's equipped with everything a physical shop has—from spot-free water and premium tools to its own power source.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            This means you get the highest quality service without the hassle of getting to a shop, waiting for hours, or arranging for a ride back. We bring the excellence, convenience, and obsession with detail right to your driveway.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MobileRigSection;