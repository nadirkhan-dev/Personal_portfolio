/**
 * this function calculates total years of experience from 2025 to current date
 * @returns total years of experience
 */
export const getTotalExperience = () => {
  const startDate = new Date(2025, 0, 1); // started professional frontend work in 2025
  const currentDate = new Date();
  let diff = currentDate.valueOf() - startDate.valueOf();
  let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

  return years;
};

export const isMobileViewport = () => {
  return window.innerWidth < 768;
};

export const isTabletViewport = () => {
  return window.innerWidth >= 768 && window.innerWidth < 992;
};

export const isDesktopViewport = () => {
  return window.innerWidth >= 992;
};
