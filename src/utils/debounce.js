export const debounce = (fun, delay = 500) => {
  let context = this;
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(context, arguments);
    }, delay);
  };
};
