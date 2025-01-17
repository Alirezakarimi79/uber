import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";

import { onboarding } from "@/constants";
import CustomButton from "@/components/custom-button";

const Onboarding = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const swiperRef = useRef<Swiper>(null);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView
      className={"flex h-full items-center justify-between bg-white"}
    >
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign_up")}
        className={"w-full flex justify-end items-end p-5"}
      >
        <Text className={"text-black text-md font-JakartaBold"}>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className={"w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"} />
        }
        activeDot={
          <View className={"w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full"} />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            className={"flex items-center justify-center p-5"}
            key={item.id}
          >
            <Image
              source={item.image}
              resizeMode={"contain"}
              className={"w-full h-[300px]"}
            />
            <View
              className={
                "flex flex-row items-center justify-center w-full mt-5"
              }
            >
              <Text
                className={"text-black text-3xl font-bold mx-10 text-center"}
              >
                {item.title}
              </Text>
            </View>
            <Text
              className={
                "text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3"
              }
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign_up")
            : swiperRef?.current?.scrollBy(1)
        }
        className={"w-11/12 mt-10 mb-5"}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
