"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
const BarChart = ({ leads }) => {
  const maxNumberOfLead = useMemo(() => {
    const leadTotalArray = leads.monthlyLeads
      .slice(0, 8)
      .map((lead) => lead.total);
    return 135 / Math.max(...leadTotalArray);
  }, [leads.monthlyLeads]); // Only recalculate if leads.monthlyLeads changes
  return (
    <div className="flex flex-col justify-between px-4 pt-3 pb-10 gap-2">
      <div className="flex items-end gap-2 relative justify-center ">
        {leads.monthlyLeads.slice(0, 8).map((individualMonth, index) => (
          <motion.div
            key={index}
            style={{
              "--dynamic-height": `0px`,
              "--dynamic-height-lg": `0px`,
            }}
            animate={{
              "--dynamic-height": `${individualMonth.total}px`,
              "--dynamic-height-lg": `${
                individualMonth.total * maxNumberOfLead
              }px`,
            }}
            transition={{ duration: 1, delay: index * 0.2 }}
            className="bg-black flex flex-col justify-start shadow-[5px_0_10px_rgba(1,1,1,0.5)] w-5 sm:w-12 z-10 relative skew-y-3
               bottom-[0.5px] responsive-height rounded-tl-[10px] rounded-tr-[5px]
               group hover:shadow-[0_0_15px_5px] hover:shadow-black-500/50 transition-shadow duration-300"
          >
            <span className="relative top-1 text-center text-white text-xxs font-medium">
              {individualMonth.total}
            </span>
            <span className="absolute -bottom-11 text-center text-black text-xxs font-medium">
              {individualMonth.month}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
