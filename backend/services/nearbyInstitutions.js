const supabase = require("../middleware/supabaseClient");
const zipcodes = require("zipcodes");

// General Function to Get List of Institituions based off loction + radius
async function getInstitutionsNearby(zipcode, radius) {
  if (!zipcodes.lookup(zipcode)) {
    throw new Error("Invalid ZIP code.");
  }

  const nearbyZips = zipcodes.radius(zipcode, radius) || [];

  const { data, error } = await supabase
    .from("institutions")
    .select("*")
    .in("zipcode", nearbyZips);

  if (error) throw new Error(error.message);

  return { nearbyZips, institutions: data || [] };
}

module.exports = { getInstitutionsNearby };
