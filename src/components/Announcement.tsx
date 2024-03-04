import React, { useEffect } from "react";
import { DimensionValue, Dimensions, Pressable, Text } from "react-native";
import { useDispatch } from "react-redux";

import { takeAnnouncementFromQueue } from "../actions/announcementsActions";

import { globalStyles } from "../styles";

interface IAnnouncement {
  location?: "top"|"middle"|"bottom";
  value?: string;
  timeout?: number;
}

export default ({ location, value, timeout = 3000 }: IAnnouncement = {}) => {
  const { height } = Dimensions.get("window");

  const dispatch = useDispatch();

  useEffect(() => {
    const to = setTimeout(() => takeAnnouncementFromQueue(dispatch), timeout);
    return () => clearTimeout(to);
  });

  let top: DimensionValue = "90%";
  switch (location) {
    case "top":
      top = "10%";
      break;
    case "middle":
      top = height / 2;
      break;
    case "bottom":
    default:
      break;
  }

  return (
    <Pressable onPress={() => takeAnnouncementFromQueue(dispatch)} style={[globalStyles.announcement, { top }]}>
      <Text style={globalStyles.announcementText}>{value}</Text>
    </Pressable>
  );
};
