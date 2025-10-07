import React from 'react';
import { DownloadIcon, PlusCircleIcon } from './icons.jsx';
import { motion } from 'framer-motion';
import Logo from '../.../../../../src/assets/logo.svg';

function EquipmentHero({ onOpenModal }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <div className="relative h-[85vh] md:h-[90vh] overflow-hidden bg-gradient-to-br from-blue-500 via-blue-300 to-blue-400 dark:from-slate-400 dark:via-blue-900/80 dark:to-slate-600 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative z-10 flex flex-col md:flex-row items-center gap-12 px-6 py-24 text-center md:text-left lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <div className="md:w-1/2 lg:w-3/5">
            <motion.h1
              className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl"
              variants={itemVariants}
            >
              Manage your{' '}
              <span className="text-yellow-600 dark:text-yellow-400">
                Critical Assets
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl mx-auto md:mx-0 text-lg leading-8 text-slate-600 dark:text-slate-300"
              variants={itemVariants}
            >
              Your central hub for creating, viewing, and managing all station
              equipment. Streamline your workflow from single entries to bulk
              uploads with ease.
            </motion.p>
            <motion.div
              className="mt-10 flex items-center justify-center md:justify-start gap-x-6"
              variants={itemVariants}
            >
              <button
                onClick={onOpenModal}
                className="group flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-transform transform hover:scale-105"
              >
                <PlusCircleIcon className="h-5 w-5 transition-transform group-hover:rotate-90" />
                Create Equipment
              </button>
              <a
                href="/path-to-your-template/equipment_template.xlsx"
                download
                className="group flex items-center gap-2 rounded-md bg-white dark:bg-slate-800 px-6 py-3 text-sm font-semibold leading-6 text-slate-900 dark:text-white shadow-md ring-1 ring-slate-900/10 dark:ring-slate-200/20 hover:ring-slate-900/20 dark:hover:ring-slate-200/30 transition-transform transform hover:scale-105"
              >
                <DownloadIcon className="h-5 w-5 text-slate-500 dark:text-slate-400 transition-transform group-hover:-translate-y-0.5" />
                Download Template
              </a>
            </motion.div>
          </div>

          {/* Logo Animation */}
          <div className="md:w-1/2 lg:w-2/5 flex justify-center">
            <motion.img
              src={Logo}
              alt="IntelliDGA Animated Logo"
              className="w-64 h-64 lg:w-80 lg:h-80 drop-shadow-2xl"
              animate={{
                scale: [1, 1.03, 1],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              variants={itemVariants}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default EquipmentHero;
