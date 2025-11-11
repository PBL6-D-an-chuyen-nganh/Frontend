export const getNextWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay(); 
  
  let daysUntilNextMonday;
  if (currentDay === 0) { 
    daysUntilNextMonday = 1;
  } else if (currentDay === 6) {
    daysUntilNextMonday = 2;
  } else { 
    daysUntilNextMonday = 8 - currentDay;
  }
  
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilNextMonday);
  
  const weekDates = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(nextMonday);
    date.setDate(nextMonday.getDate() + i);
    weekDates.push({
      date: date.toISOString().slice(0, 10),
      displayDate: date.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      dayName: date.toLocaleDateString("vi-VN", { weekday: "long" })
    });
  }
  
  return weekDates;
};