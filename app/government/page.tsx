"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Building2,
  Clock,
  LogOut,
  Moon,
  Sun,
  ArrowLeft,
  Users,
  GraduationCap,
  TrendingUp,
  MapPin,
  School,
  BarChart3,
} from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/components/auth-provider"

// Real district data for Indian states
const stateDistrictData = {
  "Andhra Pradesh": [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Krishna",
    "Kurnool",
    "Nellore",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa",
  ],
  "Arunachal Pradesh": [
    "Anjaw",
    "Changlang",
    "Dibang Valley",
    "East Kameng",
    "East Siang",
    "Kamle",
    "Kra Daadi",
    "Kurung Kumey",
    "Lepa Rada",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Namsai",
    "Pakke Kessang",
    "Papum Pare",
    "Shi Yomi",
    "Siang",
    "Tawang",
    "Tirap",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang",
  ],
  Assam: [
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup",
    "Kamrup Metropolitan",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Dima Hasao",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong",
  ],
  Bihar: [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
  ],
  Chhattisgarh: [
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada",
    "Dhamtari",
    "Durg",
    "Gariaband",
    "Gaurela Pendra Marwahi",
    "Janjgir Champa",
    "Jashpur",
    "Kabirdham",
    "Kanker",
    "Kondagaon",
    "Korba",
    "Koriya",
    "Mahasamund",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sukma",
    "Surajpur",
    "Surguja",
  ],
  Goa: ["North Goa", "South Goa"],
  Gujarat: [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad",
  ],
  Haryana: [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Nuh",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar",
  ],
  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul and Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una",
  ],
  Jharkhand: [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribagh",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahebganj",
    "Seraikela Kharsawan",
    "Simdega",
    "West Singhbhum",
  ],
  Karnataka: [
    "Bagalkot",
    "Ballari",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikballapur",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru",
    "Raichur",
    "Ramanagara",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada",
    "Vijayapura",
    "Yadgir",
  ],
  Kerala: [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ],
  "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chachaura",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Hoshangabad",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Maihar",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Narsinghpur",
    "Neemuch",
    "Niwari",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha",
  ],
  Maharashtra: [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ],
  Manipur: [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul",
  ],
  Meghalaya: [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills",
  ],
  Mizoram: [
    "Aizawl",
    "Champhai",
    "Hnahthial",
    "Kolasib",
    "Khawzawl",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Saitual",
    "Serchhip",
  ],
  Nagaland: [
    "Chumukedima",
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Niuland",
    "Noklak",
    "Peren",
    "Phek",
    "Shamator",
    "Tseminyu",
    "Tuensang",
    "Wokha",
    "Zunheboto",
  ],
  Odisha: [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundargarh",
  ],
  Punjab: [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Malerkotla",
    "Mansa",
    "Moga",
    "Mohali",
    "Muktsar",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sangrur",
    "Shaheed Bhagat Singh Nagar",
    "Tarn Taran",
  ],
  Rajasthan: [
    "Ajmer",
    "Alwar",
    "Banswara",
    "Baran",
    "Barmer",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Dholpur",
    "Dungarpur",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kota",
    "Nagaur",
    "Pali",
    "Pratapgarh",
    "Rajsamand",
    "Sawai Madhopur",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur",
  ],
  Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupattur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ],
  Telangana: [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem Asifabad",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal Rural",
    "Warangal Urban",
    "Yadadri Bhuvanagiri",
  ],
  Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Ayodhya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kasganj",
    "Kaushambi",
    "Kheri",
    "Kushinagar",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "Prayagraj",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamli",
    "Shrawasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi",
  ],
  Uttarakhand: [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi",
  ],
  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur",
  ],
}

// Mock school data
const generateSchoolData = (district: string) => [
  {
    id: 1,
    name: `${district} Government High School`,
    type: "Government",
    students: 450,
    teachers: 25,
    attendance: 87.5,
    established: 1985,
  },
  {
    id: 2,
    name: `${district} Public School`,
    type: "Private",
    students: 320,
    teachers: 18,
    attendance: 92.3,
    established: 1998,
  },
  {
    id: 3,
    name: `${district} Kendriya Vidyalaya`,
    type: "Central",
    students: 280,
    teachers: 16,
    attendance: 89.7,
    established: 1990,
  },
  {
    id: 4,
    name: `${district} Model School`,
    type: "Government",
    students: 380,
    teachers: 22,
    attendance: 85.2,
    established: 1975,
  },
]

const attendanceTrendData = [
  { month: "Jan", attendance: 85.2 },
  { month: "Feb", attendance: 87.8 },
  { month: "Mar", attendance: 89.1 },
  { month: "Apr", attendance: 86.5 },
  { month: "May", attendance: 88.9 },
  { month: "Jun", attendance: 90.2 },
]

const statesData = {
  "Andhra Pradesh": {
    districts: [
      { name: "Anantapur", schools: [], totalStudents: 5000, averageAttendance: 82.5 },
      { name: "Chittoor", schools: [], totalStudents: 4500, averageAttendance: 85.0 },
    ],
    totalSchools: 250,
    totalStudents: 120000,
    averageAttendance: 83.8,
  },
  "Arunachal Pradesh": {
    districts: [
      { name: "Anjaw", schools: [], totalStudents: 1200, averageAttendance: 78.2 },
      { name: "Changlang", schools: [], totalStudents: 1500, averageAttendance: 80.5 },
    ],
    totalSchools: 80,
    totalStudents: 35000,
    averageAttendance: 79.5,
  },
  Assam: {
    districts: [
      { name: "Baksa", schools: [], totalStudents: 3200, averageAttendance: 81.1 },
      { name: "Barpeta", schools: [], totalStudents: 3500, averageAttendance: 83.4 },
    ],
    totalSchools: 180,
    totalStudents: 85000,
    averageAttendance: 82.3,
  },
  Bihar: {
    districts: [
      { name: "Araria", schools: [], totalStudents: 4200, averageAttendance: 75.5 },
      { name: "Arwal", schools: [], totalStudents: 4500, averageAttendance: 77.8 },
    ],
    totalSchools: 220,
    totalStudents: 110000,
    averageAttendance: 76.7,
  },
  Chhattisgarh: {
    districts: [
      { name: "Balod", schools: [], totalStudents: 2800, averageAttendance: 80.2 },
      { name: "Baloda Bazar", schools: [], totalStudents: 3000, averageAttendance: 82.5 },
    ],
    totalSchools: 150,
    totalStudents: 75000,
    averageAttendance: 81.4,
  },
  Goa: {
    districts: [
      { name: "North Goa", schools: [], totalStudents: 1800, averageAttendance: 88.9 },
      { name: "South Goa", schools: [], totalStudents: 2000, averageAttendance: 90.2 },
    ],
    totalSchools: 100,
    totalStudents: 40000,
    averageAttendance: 89.6,
  },
  Gujarat: {
    districts: [
      { name: "Ahmedabad", schools: [], totalStudents: 6200, averageAttendance: 84.5 },
      { name: "Amreli", schools: [], totalStudents: 5500, averageAttendance: 86.8 },
    ],
    totalSchools: 300,
    totalStudents: 150000,
    averageAttendance: 85.7,
  },
  Haryana: {
    districts: [
      { name: "Ambala", schools: [], totalStudents: 3800, averageAttendance: 83.2 },
      { name: "Bhiwani", schools: [], totalStudents: 4000, averageAttendance: 85.5 },
    ],
    totalSchools: 200,
    totalStudents: 95000,
    averageAttendance: 84.4,
  },
  "Himachal Pradesh": {
    districts: [
      { name: "Bilaspur", schools: [], totalStudents: 2200, averageAttendance: 86.9 },
      { name: "Chamba", schools: [], totalStudents: 2500, averageAttendance: 88.2 },
    ],
    totalSchools: 120,
    totalStudents: 60000,
    averageAttendance: 87.6,
  },
  Jharkhand: {
    districts: [
      { name: "Bokaro", schools: [], totalStudents: 3500, averageAttendance: 77.5 },
      { name: "Chatra", schools: [], totalStudents: 3800, averageAttendance: 79.8 },
    ],
    totalSchools: 190,
    totalStudents: 90000,
    averageAttendance: 78.7,
  },
  Karnataka: {
    districts: [
      { name: "Bagalkot", schools: [], totalStudents: 4800, averageAttendance: 85.1 },
      { name: "Ballari", schools: [], totalStudents: 5000, averageAttendance: 87.4 },
    ],
    totalSchools: 260,
    totalStudents: 130000,
    averageAttendance: 86.3,
  },
  Kerala: {
    districts: [
      { name: "Alappuzha", schools: [], totalStudents: 3200, averageAttendance: 89.5 },
      { name: "Ernakulam", schools: [], totalStudents: 3500, averageAttendance: 91.8 },
    ],
    totalSchools: 170,
    totalStudents: 80000,
    averageAttendance: 90.7,
  },
  "Madhya Pradesh": {
    districts: [
      { name: "Agar Malwa", schools: [], totalStudents: 2500, averageAttendance: 78.5 },
      { name: "Alirajpur", schools: [], totalStudents: 2800, averageAttendance: 80.8 },
    ],
    totalSchools: 140,
    totalStudents: 70000,
    averageAttendance: 79.7,
  },
  Maharashtra: {
    districts: [
      { name: "Ahmednagar", schools: [], totalStudents: 5200, averageAttendance: 83.5 },
      { name: "Akola", schools: [], totalStudents: 5500, averageAttendance: 85.8 },
    ],
    totalSchools: 280,
    totalStudents: 140000,
    averageAttendance: 84.7,
  },
  Manipur: {
    districts: [
      { name: "Bishnupur", schools: [], totalStudents: 1800, averageAttendance: 81.5 },
      { name: "Chandel", schools: [], totalStudents: 2000, averageAttendance: 83.8 },
    ],
    totalSchools: 90,
    totalStudents: 45000,
    averageAttendance: 82.7,
  },
  Meghalaya: {
    districts: [
      { name: "East Garo Hills", schools: [], totalStudents: 1500, averageAttendance: 79.5 },
      { name: "East Jaintia Hills", schools: [], totalStudents: 1700, averageAttendance: 81.8 },
    ],
    totalSchools: 70,
    totalStudents: 30000,
    averageAttendance: 80.7,
  },
  Mizoram: {
    districts: [
      { name: "Aizawl", schools: [], totalStudents: 2800, averageAttendance: 87.5 },
      { name: "Champhai", schools: [], totalStudents: 3000, averageAttendance: 89.8 },
    ],
    totalSchools: 160,
    totalStudents: 78000,
    averageAttendance: 88.7,
  },
  Nagaland: {
    districts: [
      { name: "Chumukedima", schools: [], totalStudents: 1200, averageAttendance: 76.5 },
      { name: "Dimapur", schools: [], totalStudents: 1400, averageAttendance: 78.8 },
    ],
    totalSchools: 60,
    totalStudents: 28000,
    averageAttendance: 77.7,
  },
  Odisha: {
    districts: [
      { name: "Angul", schools: [], totalStudents: 3200, averageAttendance: 79.5 },
      { name: "Balangir", schools: [], totalStudents: 3400, averageAttendance: 81.8 },
    ],
    totalSchools: 170,
    totalStudents: 82000,
    averageAttendance: 80.7,
  },
  Punjab: {
    districts: [
      { name: "Amritsar", schools: [], totalStudents: 4500, averageAttendance: 85.5 },
      { name: "Barnala", schools: [], totalStudents: 4700, averageAttendance: 87.8 },
    ],
    totalSchools: 240,
    totalStudents: 115000,
    averageAttendance: 86.7,
  },
  Rajasthan: {
    districts: [
      { name: "Ajmer", schools: [], totalStudents: 4200, averageAttendance: 81.5 },
      { name: "Alwar", schools: [], totalStudents: 4400, averageAttendance: 83.8 },
    ],
    totalSchools: 220,
    totalStudents: 105000,
    averageAttendance: 82.7,
  },
  Sikkim: {
    districts: [
      { name: "East Sikkim", schools: [], totalStudents: 1500, averageAttendance: 88.5 },
      { name: "North Sikkim", schools: [], totalStudents: 1700, averageAttendance: 90.8 },
    ],
    totalSchools: 80,
    totalStudents: 38000,
    averageAttendance: 89.7,
  },
  "Tamil Nadu": {
    districts: [
      { name: "Ariyalur", schools: [], totalStudents: 3500, averageAttendance: 82.5 },
      { name: "Chengalpattu", schools: [], totalStudents: 3700, averageAttendance: 84.8 },
    ],
    totalSchools: 180,
    totalStudents: 88000,
    averageAttendance: 83.7,
  },
  Telangana: {
    districts: [
      { name: "Adilabad", schools: [], totalStudents: 2800, averageAttendance: 78.5 },
      { name: "Bhadradri Kothagudem", schools: [], totalStudents: 3000, averageAttendance: 80.8 },
    ],
    totalSchools: 150,
    totalStudents: 72000,
    averageAttendance: 79.7,
  },
  Tripura: {
    districts: [
      { name: "Dhalai", schools: [], totalStudents: 1500, averageAttendance: 81.5 },
      { name: "Gomati", schools: [], totalStudents: 1700, averageAttendance: 83.8 },
    ],
    totalSchools: 70,
    totalStudents: 32000,
    averageAttendance: 82.7,
  },
  "Uttar Pradesh": {
    districts: [
      { name: "Agra", schools: [], totalStudents: 5500, averageAttendance: 75.5 },
      { name: "Aligarh", schools: [], totalStudents: 5700, averageAttendance: 77.8 },
    ],
    totalSchools: 290,
    totalStudents: 145000,
    averageAttendance: 76.7,
  },
  Uttarakhand: {
    districts: [
      { name: "Almora", schools: [], totalStudents: 2200, averageAttendance: 86.5 },
      { name: "Bageshwar", schools: [], totalStudents: 2400, averageAttendance: 88.8 },
    ],
    totalSchools: 110,
    totalStudents: 55000,
    averageAttendance: 87.7,
  },
  "West Bengal": {
    districts: [
      { name: "Alipurduar", schools: [], totalStudents: 4800, averageAttendance: 80.5 },
      { name: "Bankura", schools: [], totalStudents: 5000, averageAttendance: 82.8 },
    ],
    totalSchools: 250,
    totalStudents: 125000,
    averageAttendance: 81.7,
  },
}

export default function GovernmentPortal() {
  const { theme, setTheme } = useTheme()
  const { logout } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedState, setSelectedState] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedSchool, setSelectedSchool] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewLevel, setViewLevel] = useState<"states" | "districts" | "schools" | "school-details">("states")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const states = Object.keys(stateDistrictData)
  const districts = selectedState ? stateDistrictData[selectedState as keyof typeof stateDistrictData] || [] : []
  const schools = selectedDistrict ? generateSchoolData(selectedDistrict) : []

  const filteredStates = states.filter((state) => state.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredDistricts = districts.filter((district) => district.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredSchools = schools.filter((school) => school.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleStateSelect = (state: string) => {
    setSelectedState(state)
    setSelectedDistrict("")
    setSelectedSchool(null)
    setViewLevel("districts")
    setSearchTerm("")
  }

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district)
    setSelectedSchool(null)
    setViewLevel("schools")
    setSearchTerm("")
  }

  const handleSchoolSelect = (school: any) => {
    setSelectedSchool(school)
    setViewLevel("school-details")
  }

  const handleBack = () => {
    if (viewLevel === "school-details") {
      setViewLevel("schools")
      setSelectedSchool(null)
    } else if (viewLevel === "schools") {
      setViewLevel("districts")
      setSelectedDistrict("")
    } else if (viewLevel === "districts") {
      setViewLevel("states")
      setSelectedState("")
    }
    setSearchTerm("")
  }

  const getBreadcrumb = () => {
    const parts = []
    if (selectedState) parts.push(selectedState)
    if (selectedDistrict) parts.push(selectedDistrict)
    if (selectedSchool) parts.push(selectedSchool.name)
    return parts.join(" > ")
  }

  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border animate-in slide-in-from-top duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-left duration-500">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center animate-pulse">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Government Portal</h1>
              <p className="text-sm text-muted-foreground">Educational Analytics Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-right duration-500">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: "60s" }} />
              <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:scale-110 transition-transform duration-200"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-4 h-4 animate-in spin-in-180 duration-300" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-105 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6 animate-in fade-in slide-in-from-bottom duration-500">
          {viewLevel !== "states" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (viewLevel === "school-details") {
                  setViewLevel("schools")
                  setSelectedSchool(null)
                } else if (viewLevel === "schools") {
                  setViewLevel("districts")
                  setSelectedDistrict("")
                } else if (viewLevel === "districts") {
                  setViewLevel("states")
                  setSelectedState("")
                }
              }}
              className="hover:scale-105 transition-transform duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span className={viewLevel === "states" ? "font-medium text-foreground" : ""}>States</span>
            {selectedState && (
              <>
                <span>/</span>
                <span className={viewLevel === "districts" ? "font-medium text-foreground" : ""}>{selectedState}</span>
              </>
            )}
            {selectedDistrict && (
              <>
                <span>/</span>
                <span className={viewLevel === "schools" ? "font-medium text-foreground" : ""}>{selectedDistrict}</span>
              </>
            )}
            {selectedSchool && (
              <>
                <span>/</span>
                <span className="font-medium text-foreground">{selectedSchool.name}</span>
              </>
            )}
          </div>
        </div>

        {/* States View */}
        {viewLevel === "states" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center animate-in fade-in slide-in-from-bottom duration-500">
              <h2 className="text-2xl font-bold">Indian States & Union Territories</h2>
              <Input
                placeholder="Search states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>

            {/* National Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { title: "Total States/UTs", value: "36", icon: MapPin, color: "text-blue-600" },
                { title: "Total Schools", value: "1.5M", icon: Building2, color: "text-green-600" },
                { title: "Total Students", value: "264M", icon: Users, color: "text-purple-600" },
                { title: "Average Attendance", value: "84.2%", icon: TrendingUp, color: "text-orange-600" },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Object.entries(statesData)
                .filter(([state]) => state.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(([state, data], index) => (
                  <Card
                    key={state}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-in fade-in slide-in-from-bottom duration-500"
                    onClick={() => {
                      setSelectedState(state)
                      setViewLevel("districts")
                    }}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {state}
                        <Badge variant="outline">{data.districts.length} districts</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Schools:</span>
                          <span className="font-medium">{data.totalSchools.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Students:</span>
                          <span className="font-medium">{data.totalStudents.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Attendance:</span>
                          <Badge
                            variant={data.averageAttendance >= 80 ? "default" : "destructive"}
                            className={data.averageAttendance >= 80 ? "bg-green-500" : ""}
                          >
                            {data.averageAttendance}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Districts View */}
        {viewLevel === "districts" && selectedState && (
          <div className="space-y-6">
            <div className="flex justify-between items-center animate-in fade-in slide-in-from-bottom duration-500">
              <h2 className="text-2xl font-bold">Districts in {selectedState}</h2>
              <Input
                placeholder="Search districts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>

            {/* State Overview */}
            <Card className="animate-in fade-in slide-in-from-bottom duration-500 delay-200">
              <CardHeader>
                <CardTitle>State Overview - {selectedState}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{statesData[selectedState].districts.length}</div>
                    <div className="text-sm text-muted-foreground">Districts</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {statesData[selectedState].totalSchools.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Schools</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {statesData[selectedState].totalStudents.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {statesData[selectedState].averageAttendance}%
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Attendance</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {statesData[selectedState].districts
                .filter((district: any) => district.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((district: any, index: number) => (
                  <Card
                    key={district.name}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-in fade-in slide-in-from-bottom duration-500"
                    onClick={() => {
                      setSelectedDistrict(district.name)
                      setViewLevel("schools")
                    }}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {district.name}
                        <Badge variant="outline">{district.schools.length} schools</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Students:</span>
                          <span className="font-medium">{district.totalStudents.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Attendance:</span>
                          <Badge
                            variant={district.averageAttendance >= 80 ? "default" : "destructive"}
                            className={district.averageAttendance >= 80 ? "bg-green-500" : ""}
                          >
                            {district.averageAttendance}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Schools View */}
        {viewLevel === "schools" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
                  <School className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{schools.length}</div>
                  <p className="text-xs text-muted-foreground">in {selectedDistrict}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {schools.reduce((sum, school) => sum + school.students, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Across all schools</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                  <GraduationCap className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{schools.reduce((sum, school) => sum + school.teachers, 0)}</div>
                  <p className="text-xs text-muted-foreground">Teaching staff</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(schools.reduce((sum, school) => sum + school.attendance, 0) / schools.length).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">District average</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Schools in {selectedDistrict}</CardTitle>
                <CardDescription>Select a school to view detailed information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSchools.map((school) => (
                    <Card
                      key={school.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-300 dark:hover:border-green-600"
                      onClick={() => handleSchoolSelect(school)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                              <School className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">{school.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {school.type} • Est. {school.established}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-4">
                              <div>
                                <p className="text-sm font-medium">{school.students} Students</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{school.teachers} Teachers</p>
                              </div>
                              <Badge
                                variant={school.attendance >= 85 ? "default" : "destructive"}
                                className={school.attendance >= 85 ? "bg-green-500" : ""}
                              >
                                {school.attendance}% Attendance
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* School Details View */}
        {viewLevel === "school-details" && selectedSchool && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <School className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedSchool.name}</CardTitle>
                    <CardDescription>
                      {selectedSchool.type} School • Established {selectedSchool.established}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedSchool.students}</div>
                  <p className="text-xs text-muted-foreground">Enrolled students</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Teaching Staff</CardTitle>
                  <GraduationCap className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedSchool.teachers}</div>
                  <p className="text-xs text-muted-foreground">Faculty members</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Student-Teacher Ratio</CardTitle>
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(selectedSchool.students / selectedSchool.teachers)}
                  </div>
                  <p className="text-xs text-muted-foreground">Students per teacher</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedSchool.attendance}%</div>
                  <p className="text-xs text-muted-foreground">Current month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Attendance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={attendanceTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="attendance" stroke="#f97316" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>School Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">School Type</p>
                      <p className="font-medium">{selectedSchool.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Established</p>
                      <p className="font-medium">{selectedSchool.established}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">District</p>
                      <p className="font-medium">{selectedDistrict}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">State</p>
                      <p className="font-medium">{selectedState}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Daily Attendance</span>
                        <Badge variant="outline">{selectedSchool.attendance}%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Weekly Average</span>
                        <Badge variant="outline">{(selectedSchool.attendance - 2).toFixed(1)}%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly Average</span>
                        <Badge variant="outline">{(selectedSchool.attendance - 1).toFixed(1)}%</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
