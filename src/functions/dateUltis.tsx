export const getMonthDays = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getWeekDays = () => {
  return [
    { name: 'Domingo', shortName: 'Dom' },
    { name: 'Segunda-feira', shortName: 'Seg' },
    { name: 'Terça-feira', shortName: 'Ter' },
    { name: 'Quarta-feira', shortName: 'Qua' },
    { name: 'Quinta-feira', shortName: 'Qui' },
    { name: 'Sexta-feira', shortName: 'Sex' },
    { name: 'Sábado', shortName: 'Sáb' },
  ];
};

export const getEventsForDay = (day: number, month: number, year: number, unidade: any) => {
  if (!unidade?.Schedules) return [];

  return unidade.Schedules.filter((schedule: any) => {
    const scheduleDate = new Date(schedule.date_schedule);
    return (
        scheduleDate.getDate() === day &&
        scheduleDate.getMonth() === month &&
        scheduleDate.getFullYear() === year
    );
  });
};
