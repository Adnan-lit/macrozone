import HomeHeader from "@/app/components/HomeHeader";
import MacroGrid from "@/app/components/MacroGrid";
import RecentMeals from "@/app/components/RecentMeals";
import ShareButton from "@/app/components/ShareButton";
import { getMeals, Meal } from "@/app/storage/meals";
import { globalStyles } from "@/app/styles/global";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import CopyButton from "@/app/components/CopyButton";
import ReminderToggle from "@/app/components/ReminderToggle";

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
    console.log("Loaded meals:", data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>MacroZone</Text>
        <ShareButton meals={meals} />
      </View>
      <HomeHeader />
      <MacroGrid meals={meals} />
      <CopyButton meals={meals} />
      {Platform.OS !== "android" && <ReminderToggle />}
      <RecentMeals meals={meals} onDelete={loadMeals} />
    </ScrollView>
  );
}
