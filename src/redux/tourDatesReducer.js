import history from "../history";

//ACTION CREATORS:
export function setTourDatesData(data) {
  return {
    type: "SET_TOUR_DATES_DATA",
    data
  };
}

export function setSelectedEvent(event) {
  return {
    type: "SET_SELECTED_EVENT",
    event
  };
}
export function setSelectedTour(tourId, tourDate) {
  return {
    type: "SET_SELECTED_TOUR",
    tourId,
    tourDate
  };
}

// TOUR DATES PAGE LOGIC
export function findClosestDate(tourDatesData) {
  const now = new Date();
  let closest = Infinity;
  let closestDate;

  tourDatesData.forEach(tourDate => {
    const endDate = new Date(tourDate.end_date);

    if (Math.abs(now - endDate) < Math.abs(now - closest) && now < endDate) {
      closest = Date.parse(endDate);
      closestDate = tourDate.end_date;
    }
  });
  return closestDate;
}

export function transformTourDateData(tourDateData) {
  const monthNames = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
  };
  const startDate = tourDateData.start_date;
  const endDate = tourDateData.end_date;
  const cityName = tourDateData.event_city.name;
  // Ternary statement used to get rid of 0 from single digit days or months
  const startDay =
    startDate[8] !== "0" ? `${startDate[8]}${startDate[9]}` : `${startDate[9]}`;
  const endDay =
    endDate[8] !== "0" ? `${endDate[8]}${endDate[9]}` : `${endDate[9]}`;
  //Months converted to INTs to work with monthNames
  const startMonth =
    startDate[5] !== "0"
      ? Number(`${startDate[5]}${startDate[6]}`)
      : startDate[6];
  const endMonth =
    endDate[5] !== "0" ? Number(`${endDate[5]}${endDate[6]}`) : `${endDate[6]}`;
  const startYear = startDate[0] + startDate[1] + startDate[2] + startDate[3];
  const endYear = endDate[0] + endDate[1] + endDate[2] + endDate[3];

  if (startMonth !== endMonth) {
    return `${cityName} - ${monthNames[startMonth]} ${startDay}, ${startYear} - ${monthNames[endMonth]} ${endDay}, ${endYear}`;
  } else {
    return `${cityName} - ${monthNames[startMonth]} ${startDay}-${endDay}, ${startYear}`;
  }
}

export function pageRouter(route) {
  route === "goBack" ? history.goBack() : history.push(route);
}

//REDUCER

const initialState = {
  tourDatesData: [],
  tourDateId: null,
  tourDate: ""
};

export default function tourDatesReducer(
  tourDatesState = initialState,
  action
) {
  switch (action.type) {
    case "SET_TOUR_DATES_DATA":
      const closestDate = findClosestDate(action.data);
      const defaultTour = action.data.find(tourDateData => {
        return tourDateData.end_date === closestDate;
      });

      return {
        ...tourDatesState,
        tourDatesData: action.data,
        tourDateId: defaultTour.id,
        tourDate: transformTourDateData(defaultTour)
      };
    case "SET_SELECTED_TOUR":
      return {
        ...tourDatesState,
        tourDateId: Number(action.tourId),
        tourDate: action.tourDate
      };
    default:
      return tourDatesState;
  }
}
