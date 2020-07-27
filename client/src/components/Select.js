import React, { useState, useEffect } from "react";

import { format, parse, subMonths, addMonths } from "date-fns";
import pt from "date-fns/locale/pt-BR";

export default function Select({ onPeriodSelect, onButtonClick }) {
  const [period, setPeriod] = useState([]);
  const [value, setValue] = useState(format(new Date(), "yyyy-MM"));

  useEffect(() => {
    const periods = () => {
      const d = new Date();
      let arrayDate = [];
      let monthCount = 0;
      let dateStart = d.setFullYear(d.getFullYear() - 1, 0);
      let dateEnd = d.setFullYear(d.getFullYear() + 2, 11);

      d.setFullYear(d.getFullYear() - 2);

      while (dateStart < dateEnd) {
        while (monthCount < 12) {
          dateStart = d.setFullYear(d.getFullYear(), monthCount);
          monthCount = monthCount + 1;
          arrayDate.push(format(dateStart, "yyyy-MM"));
        }
        monthCount = 0;
        dateStart = d.setFullYear(d.getFullYear() + 1, monthCount);
      }

      setPeriod(arrayDate);
    };

    periods();
  }, []);

  const handleClickPrevious = () => {
    const currPeriod = parse(value, "yyyy-MM", new Date());
    const subPeriod = format(subMonths(currPeriod, 1), "yyyy-MM");
    setValue(subPeriod);
    onButtonClick(subPeriod);
    console.log(subPeriod);
  };

  const handleClickNext = () => {
    const currPeriod = parse(value, "yyyy-MM", new Date());
    const subPeriod = format(addMonths(currPeriod, 1), "yyyy-MM");
    setValue(subPeriod);
    onButtonClick(subPeriod);
    console.log(subPeriod);
  };

  const handleSelect = (selectedPeriod) => {
    setValue(selectedPeriod.target.value);
    onPeriodSelect(selectedPeriod.target.value);
  };

  const formatPeriod = (valuePeriod) => {
    const showPeriod = parse(valuePeriod, "yyyy-MM", new Date());
    return format(showPeriod, "MMM / yyyy", { locale: pt });
  };

  return (
    <div className="row">
      <div className="col s3">
        <button
          className="btn waves-effect waves-light"
          style={{ zIndex: "unset" }}
          onClick={handleClickPrevious}
        >
          <i className=" medium material-icons ">navigate_before</i>
        </button>
      </div>
      <div className="col s6">
        <select className="browser-default m6" value={value} onChange={handleSelect}>
          {period.map((period) => (
            <option key={period} value={period}>
              {formatPeriod(period)}
            </option>
          ))}
        </select>
      </div>
      <div className="col s3">
        <button
          className="btn waves-effect waves-light"
          style={{ zIndex: "unset" }}
          onClick={handleClickNext}
        >
          <i className=" medium material-icons ">navigate_next</i>
        </button>
      </div>
    </div>
  );
}
