import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: string[];
  testCase?: {
    nums: number[];
    target: number;
    expected: number[];
  };
}

const problems: { [key: string]: Problem } = {
  "1": {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: ["Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]"],
    testCase: { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
  },
};

const ProblemDetails = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const [code, setCode] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const problem = problems[id];

  const handleSubmit = () => {
    if (!problem?.testCase) {
      setResult("No test case available");
      return;
    }
    try {
      // Mock test runner (unsafe, replace with server-side later)
      const fn = new Function("nums", "target", `return ${code}`) as (nums: number[], target: number) => number[];
      const output = fn(problem.testCase.nums, problem.testCase.target);
      const isCorrect = JSON.stringify(output) === JSON.stringify(problem.testCase.expected);
      setResult(isCorrect ? "Accepted" : "Wrong Answer");
    } catch (error) {
      setResult("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  if (!problem) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Problem not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{problem.title}</Text>
      <Text style={styles.difficulty}>{problem.difficulty}</Text>
      <Text style={styles.description}>{problem.description}</Text>
      <Text style={styles.examples}>{problem.examples.join("\n")}</Text>
      <TextInput
        style={styles.editor}
        multiline
        placeholder="Write your solution here..."
        placeholderTextColor="#888"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Submit" onPress={handleSubmit} color="#0066cc" />
      {result ? <Text style={[styles.result, { color: result === "Accepted" ? "green" : "red" }]}>{result}</Text> : null}
    </View>
  );
};

export default ProblemDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", padding: 20 },
  title: { color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  difficulty: { color: "#888", fontSize: 16, marginBottom: 20 },
  description: { color: "white", fontSize: 16, marginBottom: 20 },
  examples: { color: "white", fontSize: 14, marginBottom: 20 },
  editor: { flex: 1, backgroundColor: "#333", color: "white", padding: 10, borderRadius: 5, marginBottom: 20 },
  result: { fontSize: 16, marginTop: 10 },
  text: { color: "white", fontSize: 18 },
});