import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
// import countriesList from 'countries-list';
// import { useMemo } from 'react';
import { FlatList } from "react-native";
import { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";
import * as Location from "expo-location";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addDetails } from "../redux/details/detailSlice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



export default function FormPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(0);
  const [hobbies, setHobbies] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);
  const [showcaseImage, setShowcaseImage] = useState(null);
  const [showcaseVideo, setShowcaseVideo] = useState(null);
  const [location, setLocation] = useState(null);
  const [cityName, setCityName] = useState(null);
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details.details);
  const navigation = useNavigation();
  const [submitting, setSubmitting] = useState(false);
  const id = details.length + 1;
  useEffect(() => {
    // Function to fetch user's current location and get city name
    const getLocationAsync = async () => {
      try {
        // Check if location services are enabled
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied.");
          return;
        }

        // Get the user's location
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        // Get the city name using reverse geocoding
        const { coords } = location;
        const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
        // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${apiKey}`;
        const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=fc61a63bb71f79f9abf6fc3001350458&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        setCityName(data.city.name);
      } catch (error) {
        console.log("Error while fetching location:", error);
      }
    };

    getLocationAsync();
  }, []);

  const countries = [
    { country: "Afghanistan", code: "93", iso: "AF" },
    { country: "Albania", code: "355", iso: "AL" },
    { country: "Algeria", code: "213", iso: "DZ" },
    { country: "American Samoa", code: "1-684", iso: "AS" },
    { country: "Andorra", code: "376", iso: "AD" },
    { country: "Angola", code: "244", iso: "AO" },
    { country: "Anguilla", code: "1-264", iso: "AI" },
    { country: "Antarctica", code: "672", iso: "AQ" },
    { country: "Antigua and Barbuda", code: "1-268", iso: "AG" },
    { country: "Argentina", code: "54", iso: "AR" },
    { country: "Armenia", code: "374", iso: "AM" },
    { country: "Aruba", code: "297", iso: "AW" },
    { country: "Australia", code: "61", iso: "AU" },
    { country: "Austria", code: "43", iso: "AT" },
    { country: "Azerbaijan", code: "994", iso: "AZ" },
    { country: "Bahamas", code: "1-242", iso: "BS" },
    { country: "Bahrain", code: "973", iso: "BH" },
    { country: "Bangladesh", code: "880", iso: "BD" },
    { country: "Barbados", code: "1-246", iso: "BB" },
    { country: "Belarus", code: "375", iso: "BY" },
    { country: "Belgium", code: "32", iso: "BE" },
    { country: "Belize", code: "501", iso: "BZ" },
    { country: "Benin", code: "229", iso: "BJ" },
    { country: "Bermuda", code: "1-441", iso: "BM" },
    { country: "Bhutan", code: "975", iso: "BT" },
    { country: "Bolivia", code: "591", iso: "BO" },
    { country: "Bosnia and Herzegovina", code: "387", iso: "BA" },
    { country: "Botswana", code: "267", iso: "BW" },
    { country: "Brazil", code: "55", iso: "BR" },
    { country: "British Indian Ocean Territory", code: "246", iso: "IO" },
    { country: "British Virgin Islands", code: "1-284", iso: "VG" },
    { country: "Brunei", code: "673", iso: "BN" },
    { country: "Bulgaria", code: "359", iso: "BG" },
    { country: "Burkina Faso", code: "226", iso: "BF" },
    { country: "Burundi", code: "257", iso: "BI" },
    { country: "Cambodia", code: "855", iso: "KH" },
    { country: "Cameroon", code: "237", iso: "CM" },
    { country: "Canada", code: "1", iso: "CA" },
    { country: "Cape Verde", code: "238", iso: "CV" },
    { country: "Cayman Islands", code: "1-345", iso: "KY" },
    { country: "Central African Republic", code: "236", iso: "CF" },
    { country: "Chad", code: "235", iso: "TD" },
    { country: "Chile", code: "56", iso: "CL" },
    { country: "China", code: "86", iso: "CN" },
    { country: "Christmas Island", code: "61", iso: "CX" },
    { country: "Cocos Islands", code: "61", iso: "CC" },
    { country: "Colombia", code: "57", iso: "CO" },
    { country: "Comoros", code: "269", iso: "KM" },
    { country: "Cook Islands", code: "682", iso: "CK" },
    { country: "Costa Rica", code: "506", iso: "CR" },
    { country: "Croatia", code: "385", iso: "HR" },
    { country: "Cuba", code: "53", iso: "CU" },
    { country: "Curacao", code: "599", iso: "CW" },
    { country: "Cyprus", code: "357", iso: "CY" },
    { country: "Czech Republic", code: "420", iso: "CZ" },
    { country: "Democratic Republic of the Congo", code: "243", iso: "CD" },
    { country: "Denmark", code: "45", iso: "DK" },
    { country: "Djibouti", code: "253", iso: "DJ" },
    { country: "Dominica", code: "1-767", iso: "DM" },
    { country: "Dominican Republic", code: "1-809, 1-829, 1-849", iso: "DO" },
    { country: "East Timor", code: "670", iso: "TL" },
    { country: "Ecuador", code: "593", iso: "EC" },
    { country: "Egypt", code: "20", iso: "EG" },
    { country: "El Salvador", code: "503", iso: "SV" },
    { country: "Equatorial Guinea", code: "240", iso: "GQ" },
    { country: "Eritrea", code: "291", iso: "ER" },
    { country: "Estonia", code: "372", iso: "EE" },
    { country: "Ethiopia", code: "251", iso: "ET" },
    { country: "Falkland Islands", code: "500", iso: "FK" },
    { country: "Faroe Islands", code: "298", iso: "FO" },
    { country: "Fiji", code: "679", iso: "FJ" },
    { country: "Finland", code: "358", iso: "FI" },
    { country: "France", code: "33", iso: "FR" },
    { country: "French Polynesia", code: "689", iso: "PF" },
    { country: "Gabon", code: "241", iso: "GA" },
    { country: "Gambia", code: "220", iso: "GM" },
    { country: "Georgia", code: "995", iso: "GE" },
    { country: "Germany", code: "49", iso: "DE" },
    { country: "Ghana", code: "233", iso: "GH" },
    { country: "Gibraltar", code: "350", iso: "GI" },
    { country: "Greece", code: "30", iso: "GR" },
    { country: "Greenland", code: "299", iso: "GL" },
    { country: "Grenada", code: "1-473", iso: "GD" },
    { country: "Guam", code: "1-671", iso: "GU" },
    { country: "Guatemala", code: "502", iso: "GT" },
    { country: "Guernsey", code: "44-1481", iso: "GG" },
    { country: "Guinea", code: "224", iso: "GN" },
    { country: "Guinea-Bissau", code: "245", iso: "GW" },
    { country: "Guyana", code: "592", iso: "GY" },
    { country: "Haiti", code: "509", iso: "HT" },
    { country: "Honduras", code: "504", iso: "HN" },
    { country: "Hong Kong", code: "852", iso: "HK" },
    { country: "Hungary", code: "36", iso: "HU" },
    { country: "Iceland", code: "354", iso: "IS" },
    { country: "India", code: "91", iso: "IN" },
    { country: "Indonesia", code: "62", iso: "ID" },
    { country: "Iran", code: "98", iso: "IR" },
    { country: "Iraq", code: "964", iso: "IQ" },
    { country: "Ireland", code: "353", iso: "IE" },
    { country: "Isle of Man", code: "44-1624", iso: "IM" },
    { country: "Israel", code: "972", iso: "IL" },
    { country: "Italy", code: "39", iso: "IT" },
    { country: "Ivory Coast", code: "225", iso: "CI" },
    { country: "Jamaica", code: "1-876", iso: "JM" },
    { country: "Japan", code: "81", iso: "JP" },
    { country: "Jersey", code: "44-1534", iso: "JE" },
    { country: "Jordan", code: "962", iso: "JO" },
    { country: "Kazakhstan", code: "7", iso: "KZ" },
    { country: "Kenya", code: "254", iso: "KE" },
    { country: "Kiribati", code: "686", iso: "KI" },
    { country: "Kosovo", code: "383", iso: "XK" },
    { country: "Kuwait", code: "965", iso: "KW" },
    { country: "Kyrgyzstan", code: "996", iso: "KG" },
    { country: "Laos", code: "856", iso: "LA" },
    { country: "Latvia", code: "371", iso: "LV" },
    { country: "Lebanon", code: "961", iso: "LB" },
    { country: "Lesotho", code: "266", iso: "LS" },
    { country: "Liberia", code: "231", iso: "LR" },
    { country: "Libya", code: "218", iso: "LY" },
    { country: "Liechtenstein", code: "423", iso: "LI" },
    { country: "Lithuania", code: "370", iso: "LT" },
    { country: "Luxembourg", code: "352", iso: "LU" },
    { country: "Macao", code: "853", iso: "MO" },
    { country: "Macedonia", code: "389", iso: "MK" },
    { country: "Madagascar", code: "261", iso: "MG" },
    { country: "Malawi", code: "265", iso: "MW" },
    { country: "Malaysia", code: "60", iso: "MY" },
    { country: "Maldives", code: "960", iso: "MV" },
    { country: "Mali", code: "223", iso: "ML" },
    { country: "Malta", code: "356", iso: "MT" },
    { country: "Marshall Islands", code: "692", iso: "MH" },
    { country: "Mauritania", code: "222", iso: "MR" },
    { country: "Mauritius", code: "230", iso: "MU" },
    { country: "Mayotte", code: "262", iso: "YT" },
    { country: "Mexico", code: "52", iso: "MX" },
    { country: "Micronesia", code: "691", iso: "FM" },
    { country: "Moldova", code: "373", iso: "MD" },
    { country: "Monaco", code: "377", iso: "MC" },
    { country: "Mongolia", code: "976", iso: "MN" },
    { country: "Montenegro", code: "382", iso: "ME" },
    { country: "Montserrat", code: "1-664", iso: "MS" },
    { country: "Morocco", code: "212", iso: "MA" },
    { country: "Mozambique", code: "258", iso: "MZ" },
    { country: "Myanmar", code: "95", iso: "MM" },
    { country: "Namibia", code: "264", iso: "NA" },
    { country: "Nauru", code: "674", iso: "NR" },
    { country: "Nepal", code: "977", iso: "NP" },
    { country: "Netherlands", code: "31", iso: "NL" },
    { country: "Netherlands Antilles", code: "599", iso: "AN" },
    { country: "New Caledonia", code: "687", iso: "NC" },
    { country: "New Zealand", code: "64", iso: "NZ" },
    { country: "Nicaragua", code: "505", iso: "NI" },
    { country: "Niger", code: "227", iso: "NE" },
    { country: "Nigeria", code: "234", iso: "NG" },
    { country: "Niue", code: "683", iso: "NU" },
    { country: "North Korea", code: "850", iso: "KP" },
    { country: "Northern Mariana Islands", code: "1-670", iso: "MP" },
    { country: "Norway", code: "47", iso: "NO" },
    { country: "Oman", code: "968", iso: "OM" },
    { country: "Pakistan", code: "92", iso: "PK" },
    { country: "Palau", code: "680", iso: "PW" },
    { country: "Palestine", code: "970", iso: "PS" },
    { country: "Panama", code: "507", iso: "PA" },
    { country: "Papua New Guinea", code: "675", iso: "PG" },
    { country: "Paraguay", code: "595", iso: "PY" },
    { country: "Peru", code: "51", iso: "PE" },
    { country: "Philippines", code: "63", iso: "PH" },
    { country: "Pitcairn", code: "64", iso: "PN" },
    { country: "Poland", code: "48", iso: "PL" },
    { country: "Portugal", code: "351", iso: "PT" },
    { country: "Puerto Rico", code: "1-787, 1-939", iso: "PR" },
    { country: "Qatar", code: "974", iso: "QA" },
    { country: "Republic of the Congo", code: "242", iso: "CG" },
    { country: "Reunion", code: "262", iso: "RE" },
    { country: "Romania", code: "40", iso: "RO" },
    { country: "Russia", code: "7", iso: "RU" },
    { country: "Rwanda", code: "250", iso: "RW" },
    { country: "Saint Barthelemy", code: "590", iso: "BL" },
    { country: "Saint Helena", code: "290", iso: "SH" },
    { country: "Saint Kitts and Nevis", code: "1-869", iso: "KN" },
    { country: "Saint Lucia", code: "1-758", iso: "LC" },
    { country: "Saint Martin", code: "590", iso: "MF" },
    { country: "Saint Pierre and Miquelon", code: "508", iso: "PM" },
    { country: "Saint Vincent and the Grenadines", code: "1-784", iso: "VC" },
    { country: "Samoa", code: "685", iso: "WS" },
    { country: "San Marino", code: "378", iso: "SM" },
    { country: "Sao Tome and Principe", code: "239", iso: "ST" },
    { country: "Saudi Arabia", code: "966", iso: "SA" },
    { country: "Senegal", code: "221", iso: "SN" },
    { country: "Serbia", code: "381", iso: "RS" },
    { country: "Seychelles", code: "248", iso: "SC" },
    { country: "Sierra Leone", code: "232", iso: "SL" },
    { country: "Singapore", code: "65", iso: "SG" },
    { country: "Sint Maarten", code: "1-721", iso: "SX" },
    { country: "Slovakia", code: "421", iso: "SK" },
    { country: "Slovenia", code: "386", iso: "SI" },
    { country: "Solomon Islands", code: "677", iso: "SB" },
    { country: "Somalia", code: "252", iso: "SO" },
    { country: "South Africa", code: "27", iso: "ZA" },
    { country: "South Korea", code: "82", iso: "KR" },
    { country: "South Sudan", code: "211", iso: "SS" },
    { country: "Spain", code: "34", iso: "ES" },
    { country: "Sri Lanka", code: "94", iso: "LK" },
    { country: "Sudan", code: "249", iso: "SD" },
    { country: "Suriname", code: "597", iso: "SR" },
    { country: "Svalbard and Jan Mayen", code: "47", iso: "SJ" },
    { country: "Swaziland", code: "268", iso: "SZ" },
    { country: "Sweden", code: "46", iso: "SE" },
    { country: "Switzerland", code: "41", iso: "CH" },
    { country: "Syria", code: "963", iso: "SY" },
    { country: "Taiwan", code: "886", iso: "TW" },
    { country: "Tajikistan", code: "992", iso: "TJ" },
    { country: "Tanzania", code: "255", iso: "TZ" },
    { country: "Thailand", code: "66", iso: "TH" },
    { country: "Togo", code: "228", iso: "TG" },
    { country: "Tokelau", code: "690", iso: "TK" },
    { country: "Tonga", code: "676", iso: "TO" },
    { country: "Trinidad and Tobago", code: "1-868", iso: "TT" },
    { country: "Tunisia", code: "216", iso: "TN" },
    { country: "Turkey", code: "90", iso: "TR" },
    { country: "Turkmenistan", code: "993", iso: "TM" },
    { country: "Turks and Caicos Islands", code: "1-649", iso: "TC" },
    { country: "Tuvalu", code: "688", iso: "TV" },
    { country: "U.S. Virgin Islands", code: "1-340", iso: "VI" },
    { country: "Uganda", code: "256", iso: "UG" },
    { country: "Ukraine", code: "380", iso: "UA" },
    { country: "United Arab Emirates", code: "971", iso: "AE" },
    { country: "United Kingdom", code: "44", iso: "GB" },
    { country: "United States", code: "1", iso: "US" },
    { country: "Uruguay", code: "598", iso: "UY" },
    { country: "Uzbekistan", code: "998", iso: "UZ" },
    { country: "Vanuatu", code: "678", iso: "VU" },
    { country: "Vatican", code: "379", iso: "VA" },
    { country: "Venezuela", code: "58", iso: "VE" },
    { country: "Vietnam", code: "84", iso: "VN" },
    { country: "Wallis and Futuna", code: "681", iso: "WF" },
    { country: "Western Sahara", code: "212", iso: "EH" },
    { country: "Yemen", code: "967", iso: "YE" },
    { country: "Zambia", code: "260", iso: "ZM" },
    { country: "Zimbabwe", code: "263", iso: "ZW" },
  ];

  async function handleSubmit() {
    // Dispatch the action to add the details to the Redux store
    setSubmitting(true);
    if (
      !name ||
      !address ||
      !gender ||
      !hobbies ||
      !countryName ||
      !capturedImage ||
      !capturedVideo ||
      !cityName
    ) {
      Alert.alert("Required", "Please fill all the details!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      return;
    }

    await saveImageToLocal(capturedImage);
    await saveVideoToLocal(capturedVideo);

    dispatch(
      addDetails({
        id : id,
        name: name,
        address: address,
        gender: gender,
        hobbies: hobbies,
        countryName: countryName,
        image: capturedImage,
        video: capturedVideo,
        city: cityName,
      })
    );

    // Clear the form inputs after submission (optional)
    setName("");
    setAddress("");
    setGender("");
    setHobbies("");
    setCountryName("");
    setCapturedImage(null);
    setCapturedVideo(null);
    setShowcaseImage(null);
    setShowcaseVideo(null);
    navigation.navigate("SubmissionsPage");
    setSubmitting(false);
  };

  const handleRecordVideo = async () => {
    // console.log("Calling handle record");

    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Camera permission denied. Cannot record a video.");
        return;
      }
      // console.log("Videos start");
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
        aspect: [16, 9],
      });
      // console.log("Video End");
      // console.log(result);
      if (!result.canceled) {
        // Save the recorded video to local storage
        // console.log("Video saving...");
        setShowcaseVideo(result.uri);
        setCapturedVideo(result.uri);
      }
    } catch (error) {
      console.log("Error while recording video:", error);
    }
  };
  const saveVideoToLocal = async (videoPath) => {
    // console.log("Calling savevideo to local storage");
    try {
      const fileName = `${name}.mp4`;
      const destinationUri = FileSystem.documentDirectory + fileName;
      await FileSystem.copyAsync({
        from: videoPath,
        to: destinationUri,
      });
      console.log("Video saved to local storage:", destinationUri);
      setCapturedVideo(destinationUri);
    } catch (error) {
      console.log("Error while saving video:", error);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        alert("Camera permission denied. Cannot take a photo.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imagePath = result.uri;
        setShowcaseImage(imagePath);
        setCapturedImage(imagePath);
      }
    } catch (error) {
      console.log("Error while taking photo:", error);
    }
  };

  const saveImageToLocal = async (imagePath) => {
    try {
      const fileName = `${name}.jpg`;
      const destinationUri = FileSystem.documentDirectory + fileName;

      await FileSystem.copyAsync({
        from: imagePath,
        to: destinationUri,
      });

      console.log("Image saved to local storage:", destinationUri);
      setCapturedImage(destinationUri);
    } catch (error) {
      console.log("Error while saving image:", error);
    }
  };

  const handleCheckboxChange = useCallback(
    (value) => {
      const updatedHobbies = hobbies.includes(value)
        ? hobbies.filter((hobby) => hobby !== value)
        : [...hobbies, value];
      setHobbies(updatedHobbies);
    },
    [hobbies]
  );

  const renderCheckbox = useCallback(
    (value, label) => {
      const isChecked = hobbies.includes(value);

      return (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={() => handleCheckboxChange(value)}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 3,
              borderWidth: 2,
              borderColor: isChecked ? "blue" : "gray",
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isChecked && (
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "blue",
                }}
                className="flex-row items-start justify-center rounded-sm"
              >
                <Text className="text-white">✓</Text>
              </View>
            )}
          </View>
          <Text style={{ fontSize: 16 }}>{label}</Text>
        </TouchableOpacity>
      );
    },
    [handleCheckboxChange, hobbies]
  );

  const renderRadioButton = useCallback(
    (value, label) => {
      const isSelected = gender === value;

      const handleGenderChange = useCallback(() => {
        setGender(value);
      }, [value]);

      return (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={handleGenderChange}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: isSelected ? "blue" : "gray",
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isSelected && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "blue",
                }}
              />
            )}
          </View>
          <Text className="text-[16px]">{label}</Text>
        </TouchableOpacity>
      );
    },
    [gender]
  );

  const searchCountry = useCallback(
    (text) => {
      const filtered = countries.filter((country) =>
        country.country.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCountries(filtered);
    },
    [countries]
  );


  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-5 p-2 mt-2">
          <TouchableOpacity className="flex-row items-center justify-start" onPress={() => navigation.navigate("SubmissionsPage")}>
            <Text className="">
              <Entypo name="open-book" size={24} color="red" />
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center items-center my-2">
          <Text className="">
          <FontAwesome name="wpforms" size={24} color="violet"/>
          </Text>
          <Text className="text-center font-bold text-blue-600 text-xl ml-1">
            Form Page
          </Text>
          </View>
          <View className="my-2">
            <Text className="font-bold text-[18px] text-green-500">Name</Text>
            <TextInput
              className="my-3 border border-black p-4 text-[16px] rounded-md"
              placeholder="Enter your Name"
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <View className="mb-2">
          <View className="flex-row justify-start items-center">
            <Text className="font-bold text-[18px] text-green-500">
              Address
            </Text>
            <Text className="ml-1">
              <Entypo name="address" size={24} color="orange" />
            </Text>
          </View>
            <TextInput
              className="my-3 p-4 border border-black text-[16px] rounded-md"
              placeholder="Enter your Address"
              onChangeText={(text) => setAddress(text)}
              value={address}
              multiline={true}
            />
          </View>
          <View className="">
            <Text className="font-bold text-[18px] text-green-500">
              Select your Gender
            </Text>
            <View className="py-4">
              {renderRadioButton("male", "Male")}
              {renderRadioButton("female", "Female")}
            </View>
          </View>
          <View className="">
            <Text className="font-bold text-[18px] text-green-500">
              Select your Hobbies
            </Text>
            <View className="py-4">
              {renderCheckbox("reading", "Reading")}
              {renderCheckbox("painting", "Painting")}
              {renderCheckbox("gaming", "Gaming")}
            </View>
          </View>
          <View className="">
            <Text className="font-bold text-[18px] text-green-500">
              Select your Country
            </Text>
            <TouchableOpacity
              className="p-4 my-4 border border-black rounded-md"
              onPress={() => {
                setShowCountryModal(!showCountryModal);
                setFilteredCountries([]);
              }}
            >
              <Text>{countryName ? countryName : "Select Here...."}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              className="p-5 bg-green-400 rounded-md flex-row justify-center items-center"
              onPress={handleTakePhoto}
            >
              <Text className="">
              <AntDesign name="camera" size={24} color="white" />
              </Text>
              <Text className="text-center font-bold text-white ml-1">
                Take a Photo
              </Text>
            </TouchableOpacity>
            {showcaseImage && (
              <Image
                source={{ uri: showcaseImage }}
                className="self-center my-2"
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          <View className="my-2">
            <TouchableOpacity
              className="p-5 bg-green-400 rounded-md flex-row justify-center items-center"
              onPress={handleRecordVideo}
            >
              <Text className="">
                <FontAwesome name="video-camera" size={24} color="white" />
              </Text>
              <Text className="text-center font-bold text-white ml-1">
                Record a Video
              </Text>
            </TouchableOpacity>
          </View>
          {showcaseVideo && (
            <View className="my-2">
              <Text className="font-bold text-[18px] text-green-500">
                Recorded Video:
              </Text>
              <Video
                source={{ uri: showcaseVideo }}
                style={{ width: 300, height: 200 }}
                useNativeControls
                resizeMode="contain"
              />
            </View>
          )}
          <View className="my-2 flex-row items-center">
            <Text className="font-bold text-[18px] text-green-500">
              City : 
            </Text>
            <Text className="font-bold text-[18px] text-blue-500 ml-2">
              {cityName}
            </Text>
            <Text className="font-bold text-[18px] text-green-500 ml-1">
              <MaterialIcons name="location-city" size={24} color="#f2074a" />
            </Text>
          </View>
          <View className="my-2">
            <TouchableOpacity
              className="p-5 bg-blue-600 rounded-md"
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text className="text-center font-bold text-white">
                {submitting ? "Submitting..." : "Submit Details"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* The below is the dropdown for country */}
        <Modal visible={showCountryModal} animationType="slide">
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View>
              <TextInput
                className="my-3 mt-5 border border-black p-4 text-[16px] rounded-md w-[90%]"
                placeholder="Search here..."
                style={{
                  alignSelf: "center",
                }}
                onChangeText={(text) => searchCountry(text)}
              />
            </View>
            {filteredCountries?.length > 0 ? (
              <FlatList
                data={filteredCountries}
                keyExtractor={(item) => item.country}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: "black",
                    }}
                    className="py-5"
                    onPress={() => {
                      setCountryName(item.country);
                      setShowCountryModal(false);
                    }}
                  >
                    <Text>{item.country}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <FlatList
                data={countries}
                keyExtractor={(item) => item.country}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: "black",
                    }}
                    className="py-5"
                    onPress={() => {
                      setCountryName(item.country);
                      setShowCountryModal(false);
                    }}
                  >
                    <Text>{item.country}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
