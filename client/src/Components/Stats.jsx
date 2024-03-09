import React from "react";

const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "$230M+",
  },
];

const Stats = () => (
  <section className={`flex flex-row flex-wrap shadow-inner`}>
    {stats.map((stat) => (
      <div
        key={stat.id}
        className={`flex-1 grid justify-start items-center  content-center flex-row p-6 text-center ml-[100px]`}
      >
        <h4 className="font-poppins font-semibold text-[40px] text-center   text-black">
          {stat.value}
        </h4>
        <p className="font-poppins font-semibold text-[20px]   text-gradient uppercase ml-3">
          {stat.title}
        </p>
      </div>
    ))}
  </section>
);

export default Stats;
