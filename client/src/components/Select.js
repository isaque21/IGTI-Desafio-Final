import React, { useState, useEffect } from "react";

import {
  format,
  parse,
  subMonths,
  addMonths,
  getYear,
  subYears,
  addYears,
  differenceInMonths,
} from "date-fns";
import pt from "date-fns/locale/pt-BR";

export default function Select({ onPeriodSelect, onButtonClick }) {
  const [period, setPeriod] = useState([]);
  const [value, setValue] = useState(format(new Date(), "yyyy-MM"));

  const y = 1;
  useEffect(() => {
    const periods = () => {
      let arrayDate = [];

      const dateStart = subYears(new Date(getYear(new Date()), 0, 1), y);
      const dateEnd = addYears(new Date(getYear(new Date()), 11, 31), y);

      const diff = differenceInMonths(dateEnd, dateStart);

      for (let i = 0; i <= diff; i++) {
        arrayDate.push(format(addMonths(dateStart, i), "yyyy-MM"));
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
  };

  const handleClickNext = () => {
    const currPeriod = parse(value, "yyyy-MM", new Date());
    const addPeriod = format(addMonths(currPeriod, 1), "yyyy-MM");
    setValue(addPeriod);
    onButtonClick(addPeriod);
  };

  const handleSelect = (selectedPeriod) => {
    setValue(selectedPeriod.target.value);
    onPeriodSelect(selectedPeriod.target.value);
  };

  const formatPeriod = (valuePeriod) => {
    const showPeriod = parse(valuePeriod, "yyyy-MM", new Date());
    return format(showPeriod, "MMM / yyyy", { locale: pt });
  };

  const disablePrevButtom = () => {
    const dateStart = format(subYears(new Date(getYear(new Date()), 0, 1), y), "yyyy-MM");

    if (value <= dateStart) {
      return true;
    }
    return false;
  };

  const disableNextButtom = () => {
    const dateEnd = format(addYears(new Date(getYear(new Date()), 11, 31), y), "yyyy-MM");

    if (value >= dateEnd) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div className="col s1 offset-s3">
        <button
          className="btn waves-effect waves-light"
          style={{ zIndex: "unset" }}
          onClick={handleClickPrevious}
          disabled={disablePrevButtom() ? true : false}
        >
          <i className=" medium material-icons ">navigate_before</i>
        </button>
      </div>
      <div className="col s4">
        <select className="browser-default m6" value={value} onChange={handleSelect}>
          {period.map((date) => (
            <option key={period.indexOf(date)} value={date}>
              {formatPeriod(date)}
            </option>
          ))}
        </select>
      </div>
      <div className="col s1">
        <button
          className="btn waves-effect waves-light"
          style={{ zIndex: "unset" }}
          onClick={handleClickNext}
          disabled={disableNextButtom() ? true : false}
        >
          <i className=" medium material-icons ">navigate_next</i>
        </button>
      </div>
    </div>
  );
}
