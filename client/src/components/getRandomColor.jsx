export const getRandomColor = () => {
    const colors = ["red", "blue", "green", "orange", "purple", "pink"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
