import { Text } from "react-native";
import React from "react";

const MyText = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[{ fontFamily: "Manrope_400Regular" }, style]} {...otherProps}>
      {" "}
      {children}
    </Text>
  );
};

export default MyText;
