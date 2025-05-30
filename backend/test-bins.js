const { supabase } = require("./src/config/supabase");

async function createTestBins() {
  try {
    // You'll need to replace 'YOUR_USER_ID' with an actual user ID from your profiles table
    // You can get this by running: SELECT id FROM profiles LIMIT 1; in your Supabase SQL editor

    const testBins = [
      {
        title: "Tempat Sampah KOICA #1",
        location: "KOICA Building",
        level_percentage: 75,
        status: "full",
        organik_status: "empty",
        anorganik_status: "full",
        b3_status: "empty",
        user_id: "YOUR_USER_ID", // Replace with actual user ID
      },
      {
        title: "Tempat Sampah Kampus #2",
        location: "Main Campus",
        level_percentage: 45,
        status: "medium",
        organik_status: "medium",
        anorganik_status: "empty",
        b3_status: "empty",
        user_id: "YOUR_USER_ID", // Replace with actual user ID
      },
      {
        title: "Tempat Sampah Kantin #3",
        location: "Food Court",
        level_percentage: 10,
        status: "empty",
        organik_status: "empty",
        anorganik_status: "empty",
        b3_status: "empty",
        user_id: "YOUR_USER_ID", // Replace with actual user ID
      },
    ];

    console.log("Creating test bins...");

    for (const bin of testBins) {
      const { data, error } = await supabase
        .from("bins")
        .insert([bin])
        .select("*");

      if (error) {
        console.error("Error creating bin:", error);
      } else {
        console.log("Created bin:", data[0]);
      }
    }

    console.log("Test bins created successfully!");
  } catch (error) {
    console.error("Error creating test bins:", error);
  }
}

// Uncomment the line below and replace YOUR_USER_ID to run this script
// createTestBins();

console.log("To create test bins:");
console.log("1. Get a user ID from your Supabase profiles table");
console.log("2. Replace 'YOUR_USER_ID' in this file with the actual user ID");
console.log("3. Uncomment the createTestBins() call at the bottom");
console.log("4. Run: node test-bins.js");
