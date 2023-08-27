import React from "react";
import { motion } from "framer-motion";

const Graph = (props) => {
  const { value } = props;

  const maxValue = +Math.max(...value);

  const bgColor = (index) => {
    if (+index === 0) return "green";
    if (+value[index] > +value[index - 1]) return "green";
    else return "red";
  };
  const percentHeight = (priceValue) => ((priceValue * 100) / maxValue) * 3.7;
  const percentWidth = 1200 / value.length;

  const priceScale = (
    <div className="d-flex flex-column justify-content-between">
      <p>{maxValue}</p>
      <p>{((maxValue / 100) * 75).toFixed(2)}</p>
      <p>{((maxValue / 100) * 25).toFixed(2)}</p>
      <p>0</p>
    </div>
  );

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="d-flex" style={{ width: "1200px", height: "400px" }}>
      {priceScale}
      <motion.ul
        variants={container}
        initial="hidden"
        animate="visible"
        className="d-flex align-items-end p-4"
      >
        {value.map((el, index) => (
          <motion.li
            variants={item}
            className="border"
            key={index + new Date()}
            style={{
              height: `${percentHeight(+el)}px`,
              width: `${percentWidth}px`,
              maxWidth: "100px",
              background: bgColor(index),
            }}
          ></motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Graph;
