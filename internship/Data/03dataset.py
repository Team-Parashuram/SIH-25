import json
import random
import sys
from pathlib import Path

# --- Configuration ---
NUM_RECORDS_TO_GENERATE = 1000
OUTPUT_FILENAME = "final_internships.json"
INPUT_FILES = {
    "sectors": "sector.txt",
    "districts": "district.txt",
    "qualifications": "minimum_qualification.txt",
}

# --- Built-in District -> State Mapping Engine ---
# This large dictionary automatically derives the state from the district.
# It makes the script self-sufficient and ensures geographical accuracy.
DISTRICT_TO_STATE_MAPPING = {
    # Andhra Pradesh
    'Anantapur': 'ANDHRA PRADESH', 'Chittoor': 'ANDHRA PRADESH', 'East Godavari': 'ANDHRA PRADESH', 'Guntur': 'ANDHRA PRADESH', 'Krishna': 'ANDHRA PRADESH', 'Kurnool': 'ANDHRA PRADESH', 'Nellore': 'ANDHRA PRADESH', 'Prakasam': 'ANDHRA PRADESH', 'Srikakulam': 'ANDHRA PRADESH', 'Visakhapatnam': 'ANDHRA PRADESH', 'Vizianagaram': 'ANDHRA PRADESH', 'West Godavari': 'ANDHRA PRADESH', 'Y.S.R. Kadapa (Cuddapah)': 'ANDHRA PRADESH', 'Alluri Sitharama Raju': 'ANDHRA PRADESH', 'Anakapalli': 'ANDHRA PRADESH', 'Annamayya': 'ANDHRA PRADESH', 'Bapatla': 'ANDHRA PRADESH', 'Eluru': 'ANDHRA PRADESH', 'Kakinada': 'ANDHRA PRADESH', 'Konaseema': 'ANDHRA PRADESH', 'Nandyal': 'ANDHRA PRADESH', 'NTR': 'ANDHRA PRADESH', 'Palnadu': 'ANDHRA PRADESH', 'Parvathipuram Manyam': 'ANDHRA PRADESH', 'Sri Sathya Sai': 'ANDHRA PRADESH', 'Tirupati': 'ANDHRA PRADESH',
    # Arunachal Pradesh
    'Tawang': 'ARUNACHAL PRADESH', 'West Kameng': 'ARUNACHAL PRADESH', 'East Kameng': 'ARUNACHAL PRADESH', 'Papum Pare': 'ARUNACHAL PRADESH', 'Kurung Kumey': 'ARUNACHAL PRADESH', 'Kra Daadi': 'ARUNACHAL PRADESH', 'Lower Subansiri': 'ARUNACHAL PRADESH', 'Upper Subansiri': 'ARUNACHAL PRADESH', 'West Siang': 'ARUNACHAL PRADESH', 'East Siang': 'ARUNACHAL PRADESH', 'Siang': 'ARUNACHAL PRADESH', 'Upper Siang': 'ARUNACHAL PRADESH', 'Lower Siang': 'ARUNACHAL PRADESH', 'Lohit': 'ARUNACHAL PRADESH', 'Namsai': 'ARUNACHAL PRADESH', 'Changlang': 'ARUNACHAL PRADESH', 'Tirap': 'ARUNACHAL PRADESH', 'Longding': 'ARUNACHAL PRADESH',
    # Assam
    'Baksa': 'ASSAM', 'Barpeta': 'ASSAM', 'Biswanath': 'ASSAM', 'Bongaigaon': 'ASSAM', 'Cachar': 'ASSAM', 'Charaideo': 'ASSAM', 'Chirang': 'ASSAM', 'Darrang': 'ASSAM', 'Dhemaji': 'ASSAM', 'Dhubri': 'ASSAM', 'Dibrugarh': 'ASSAM', 'Dima Hasao': 'ASSAM', 'Goalpara': 'ASSAM', 'Golaghat': 'ASSAM', 'Hailakandi': 'ASSAM', 'Hojai': 'ASSAM', 'Jorhat': 'ASSAM', 'Kamrup': 'ASSAM', 'Kamrup Metropolitan': 'ASSAM', 'Karbi Anglong': 'ASSAM', 'Karimganj': 'ASSAM', 'Kokrajhar': 'ASSAM', 'Lakhimpur': 'ASSAM', 'Majuli': 'ASSAM', 'Morigaon': 'ASSAM', 'Nagaon': 'ASSAM', 'Nalbari': 'ASSAM', 'Sivasagar': 'ASSAM', 'Sonitpur': 'ASSAM', 'South Salmara-Mankachar': 'ASSAM', 'Tinsukia': 'ASSAM', 'Udalguri': 'ASSAM', 'West Karbi Anglong': 'ASSAM',
    # Bihar
    'Araria': 'BIHAR', 'Arwal': 'BIHAR', 'Aurangabad': 'BIHAR', 'Banka': 'BIHAR', 'Begusarai': 'BIHAR', 'Bhagalpur': 'BIHAR', 'Bhojpur': 'BIHAR', 'Buxar': 'BIHAR', 'Darbhanga': 'BIHAR', 'East Champaran (Motihari)': 'BIHAR', 'Gaya': 'BIHAR', 'Gopalganj': 'BIHAR', 'Jamui': 'BIHAR', 'Jehanabad': 'BIHAR', 'Kaimur (Bhabua)': 'BIHAR', 'Katihar': 'BIHAR', 'Khagaria': 'BIHAR', 'Kishanganj': 'BIHAR', 'Lakhisarai': 'BIHAR', 'Madhepura': 'BIHAR', 'Madhubani': 'BIHAR', 'Munger (Monghyr)': 'BIHAR', 'Muzaffarpur': 'BIHAR', 'Nalanda': 'BIHAR', 'Nawada': 'BIHAR', 'Patna': 'BIHAR', 'Purnia (Purnea)': 'BIHAR', 'Rohtas': 'BIHAR', 'Saharsa': 'BIHAR', 'Samastipur': 'BIHAR', 'Saran': 'BIHAR', 'Sheikhpura': 'BIHAR', 'Sheohar': 'BIHAR', 'Sitamarhi': 'BIHAR', 'Siwan': 'BIHAR', 'Supaul': 'BIHAR', 'Vaishali': 'BIHAR', 'West Champaran': 'BIHAR',
    # Chandigarh
    'Chandigarh': 'CHANDIGARH',
    # Chhattisgarh
    'Balod': 'CHHATTISGARH', 'Baloda Bazar': 'CHHATTISGARH', 'Balrampur': 'CHHATTISGARH', 'Bastar': 'CHHATTISGARH', 'Bemetara': 'CHHATTISGARH', 'Bijapur': 'CHHATTISGARH', 'Bilaspur': 'CHHATTISGARH', 'Dantewada (Dakshin Bastar)': 'CHHATTISGARH', 'Dhamtari': 'CHHATTISGARH', 'Durg': 'CHHATTISGARH', 'Gariaband': 'CHHATTISGARH', 'Janjgir-Champa': 'CHHATTISGARH', 'Jashpur': 'CHHATTISGARH', 'Kabirdham (Kawardha)': 'CHHATTISGARH', 'Kanker (Uttar Bastar)': 'CHHATTISGARH', 'Kondagaon': 'CHHATTISGARH', 'Korba': 'CHHATTISGARH', 'Korea (Koriya)': 'CHHATTISGARH', 'Mahasamund': 'CHHATTISGARH', 'Mungeli': 'CHHATTISGARH', 'Narayanpur': 'CHHATTISGARH', 'Raigarh': 'CHHATTISGARH', 'Raipur': 'CHHATTISGARH', 'Rajnandgaon': 'CHHATTISGARH', 'Sukma': 'CHHATTISGARH', 'Surajpur': 'CHHATTISGARH', 'Surguja': 'CHHATTISGARH',
    # Dadra and Nagar Haveli and Daman and Diu
    'Daman': 'THE DADRA AND NAGAR HAVELI AND DAMAN AND DIU', 'Diu': 'THE DADRA AND NAGAR HAVELI AND DAMAN AND DIU', 'Dadra and Nagar Haveli': 'THE DADRA AND NAGAR HAVELI AND DAMAN AND DIU',
    # Delhi
    'Central Delhi': 'DELHI', 'East Delhi': 'DELHI', 'New Delhi': 'DELHI', 'North Delhi': 'DELHI', 'North East Delhi': 'DELHI', 'North West Delhi': 'DELHI', 'Shahdara': 'DELHI', 'South Delhi': 'DELHI', 'South East Delhi': 'DELHI', 'South West Delhi': 'DELHI', 'West Delhi': 'DELHI',
    # Goa
    'North Goa': 'GOA', 'South Goa': 'GOA',
    # Gujarat
    'Ahmedabad': 'GUJARAT', 'Amreli': 'GUJARAT', 'Anand': 'GUJARAT', 'Aravalli': 'GUJARAT', 'Banaskantha (Palanpur)': 'GUJARAT', 'Bharuch': 'GUJARAT', 'Bhavnagar': 'GUJARAT', 'Botad': 'GUJARAT', 'Chhota Udepur': 'GUJARAT', 'Dahod': 'GUJARAT', 'Dangs (Ahwa)': 'GUJARAT', 'Devbhoomi Dwarka': 'GUJARAT', 'Gandhinagar': 'GUJARAT', 'Gir Somnath': 'GUJARAT', 'Jamnagar': 'GUJARAT', 'Junagadh': 'GUJARAT', 'Kachchh': 'GUJARAT', 'Kheda (Nadiad)': 'GUJARAT', 'Mahisagar': 'GUJARAT', 'Mehsana': 'GUJARAT', 'Morbi': 'GUJARAT', 'Narmada (Rajpipla)': 'GUJARAT', 'Navsari': 'GUJARAT', 'Panchmahal (Godhra)': 'GUJARAT', 'Patan': 'GUJARAT', 'Porbandar': 'GUJARAT', 'Rajkot': 'GUJARAT', 'Sabarkantha (Himmatnagar)': 'GUJARAT', 'Surat': 'GUJARAT', 'Surendranagar': 'GUJARAT', 'Tapi (Vyara)': 'GUJARAT', 'Vadodara': 'GUJARAT', 'Valsad': 'GUJARAT',
    # Haryana
    'Ambala': 'HARYANA', 'Bhiwani': 'HARYANA', 'Charkhi Dadri': 'HARYANA', 'Faridabad': 'HARYANA', 'Fatehabad': 'HARYANA', 'Gurugram': 'HARYANA', 'Hisar': 'HARYANA', 'Jhajjar': 'HARYANA', 'Jind': 'HARYANA', 'Kaithal': 'HARYANA', 'Karnal': 'HARYANA', 'Kurukshetra': 'HARYANA', 'Mahendragarh': 'HARYANA', 'Nuh': 'HARYANA', 'Palwal': 'HARYANA', 'Panchkula': 'HARYANA', 'Panipat': 'HARYANA', 'Rewari': 'HARYANA', 'Rohtak': 'HARYANA', 'Sirsa': 'HARYANA', 'Sonipat': 'HARYANA', 'Yamunanagar': 'HARYANA',
    # Himachal Pradesh
    'Bilaspur': 'HIMACHAL PRADESH', 'Chamba': 'HIMACHAL PRADESH', 'Hamirpur': 'HIMACHAL PRADESH', 'Kangra': 'HIMACHAL PRADESH', 'Kinnaur': 'HIMACHAL PRADESH', 'Kullu': 'HIMACHAL PRADESH', 'Lahaul & Spiti': 'HIMACHAL PRADESH', 'Mandi': 'HIMACHAL PRADESH', 'Shimla': 'HIMACHAL PRADESH', 'Sirmaur (Sirmour)': 'HIMACHAL PRADESH', 'Solan': 'HIMACHAL PRADESH', 'Una': 'HIMACHAL PRADESH',
    # Jammu and Kashmir
    'Anantnag': 'JAMMU AND KASHMIR', 'Bandipore': 'JAMMU AND KASHMIR', 'Baramulla': 'JAMMU AND KASHMIR', 'Budgam': 'JAMMU AND KASHMIR', 'Doda': 'JAMMU AND KASHMIR', 'Ganderbal': 'JAMMU AND KASHMIR', 'Jammu': 'JAMMU AND KASHMIR', 'Kathua': 'JAMMU AND KASHMIR', 'Kishtwar': 'JAMMU AND KASHMIR', 'Kulgam': 'JAMMU AND KASHMIR', 'Kupwara': 'JAMMU AND KASHMIR', 'Poonch': 'JAMMU AND KASHMIR', 'Pulwama': 'JAMMU AND KASHMIR', 'Rajouri': 'JAMMU AND KASHMIR', 'Ramban': 'JAMMU AND KASHMIR', 'Reasi': 'JAMMU AND KASHMIR', 'Samba': 'JAMMU AND KASHMIR', 'Shopian': 'JAMMU AND KASHMIR', 'Srinagar': 'JAMMU AND KASHMIR', 'Udhampur': 'JAMMU AND KASHMIR',
    # Jharkhand
    'Bokaro': 'JHARKHAND', 'Chatra': 'JHARKHAND', 'Deoghar': 'JHARKHAND', 'Dhanbad': 'JHARKHAND', 'Dumka': 'JHARKHAND', 'East Singhbhum': 'JHARKHAND', 'Garhwa': 'JHARKHAND', 'Giridih': 'JHARKHAND', 'Godda': 'JHARKHAND', 'Gumla': 'JHARKHAND', 'Hazaribag': 'JHARKHAND', 'Jamtara': 'JHARKHAND', 'Khunti': 'JHARKHAND', 'Koderma': 'JHARKHAND', 'Latehar': 'JHARKHAND', 'Lohardaga': 'JHARKHAND', 'Pakur': 'JHARKHAND', 'Palamu': 'JHARKHAND', 'Ramgarh': 'JHARKHAND', 'Ranchi': 'JHARKHAND', 'Sahebganj': 'JHARKHAND', 'Seraikela-Kharsawan': 'JHARKHAND', 'Simdega': 'JHARKHAND', 'West Singhbhum': 'JHARKHAND',
    # Karnataka
    'Bagalkot': 'KARNATAKA', 'Ballari (Bellary)': 'KARNATAKA', 'Belagavi (Belgaum)': 'KARNATAKA', 'Bengaluru Rural': 'KARNATAKA', 'Bengaluru Urban': 'KARNATAKA', 'Bidar': 'KARNATAKA', 'Chamarajanagar': 'KARNATAKA', 'Chikballapur': 'KARNATAKA', 'Chikkamagaluru (Chikmagalur)': 'KARNATAKA', 'Chitradurga': 'KARNATAKA', 'Dakshina Kannada': 'KARNATAKA', 'Davangere': 'KARNATAKA', 'Dharwad': 'KARNATAKA', 'Gadag': 'KARNATAKA', 'Hassan': 'KARNATAKA', 'Haveri': 'KARNATAKA', 'Kalaburagi (Gulbarga)': 'KARNATAKA', 'Kodagu': 'KARNATAKA', 'Kolar': 'KARNATAKA', 'Koppal': 'KARNATAKA', 'Mandya': 'KARNATAKA', 'Mysuru (Mysore)': 'KARNATAKA', 'Raichur': 'KARNATAKA', 'Ramanagara': 'KARNATAKA', 'Shivamogga (Shimoga)': 'KARNATAKA', 'Tumakuru (Tumkur)': 'KARNATAKA', 'Udupi': 'KARNATAKA', 'Uttara Kannada (Karwar)': 'KARNATAKA', 'Vijayapura (Bijapur)': 'KARNATAKA', 'Yadgir': 'KARNATAKA',
    # Kerala
    'Alappuzha': 'KERALA', 'Ernakulam': 'KERALA', 'Idukki': 'KERALA', 'Kannur': 'KERALA', 'Kasaragod': 'KERALA', 'Kollam': 'KERALA', 'Kottayam': 'KERALA', 'Kozhikode': 'KERALA', 'Malappuram': 'KERALA', 'Palakkad': 'KERALA', 'Pathanamthitta': 'KERALA', 'Thiruvananthapuram': 'KERALA', 'Thrissur': 'KERALA', 'Wayanad': 'KERALA',
    # Ladakh
    'Kargil': 'LADAKH', 'Leh': 'LADAKH',
    # Lakshadweep
    'Lakshadweep': 'LAKSHADWEEP',
    # Madhya Pradesh
    'Agar Malwa': 'MADHYA PRADESH', 'Alirajpur': 'MADHYA PRADESH', 'Anuppur': 'MADHYA PRADESH', 'Ashoknagar': 'MADHYA PRADESH', 'Balaghat': 'MADHYA PRADESH', 'Barwani': 'MADHYA PRADESH', 'Betul': 'MADHYA PRADESH', 'Bhind': 'MADHYA PRADESH', 'Bhopal': 'MADHYA PRADESH', 'Burhanpur': 'MADHYA PRADESH', 'Chhatarpur': 'MADHYA PRADESH', 'Chhindwara': 'MADHYA PRADESH', 'Damoh': 'MADHYA PRADESH', 'Datia': 'MADHYA PRADESH', 'Dewas': 'MADHYA PRADESH', 'Dhar': 'MADHYA PRADESH', 'Dindori': 'MADHYA PRADESH', 'Guna': 'MADHYA PRADESH', 'Gwalior': 'MADHYA PRADESH', 'Harda': 'MADHYA PRADESH', 'Hoshangabad': 'MADHYA PRADESH', 'Indore': 'MADHYA PRADESH', 'Jabalpur': 'MADHYA PRADESH', 'Jhabua': 'MADHYA PRADESH', 'Katni': 'MADHYA PRADESH', 'Khandwa': 'MADHYA PRADESH', 'Khargone': 'MADHYA PRADESH', 'Mandla': 'MADHYA PRADESH', 'Mandsaur': 'MADHYA PRADESH', 'Morena': 'MADHYA PRADESH', 'Narsinghpur': 'MADHYA PRADESH', 'Neemuch': 'MADHYA PRADESH', 'Panna': 'MADHYA PRADESH', 'Raisen': 'MADHYA PRADESH', 'Rajgarh': 'MADHYA PRADESH', 'Ratlam': 'MADHYA PRADESH', 'Rewa': 'MADHYA PRADESH', 'Sagar': 'MADHYA PRADESH', 'Satna': 'MADHYA PRADESH', 'Sehore': 'MADHYA PRADESH', 'Seoni': 'MADHYA PRADESH', 'Shahdol': 'MADHYA PRADESH', 'Shajapur': 'MADHYA PRADESH', 'Sheopur': 'MADHYA PRADESH', 'Shivpuri': 'MADHYA PRADESH', 'Sidhi': 'MADHYA PRADESH', 'Singrauli': 'MADHYA PRADESH', 'Tikamgarh': 'MADHYA PRADESH', 'Ujjain': 'MADHYA PRADESH', 'Umaria': 'MADHYA PRADESH', 'Vidisha': 'MADHYA PRADESH',
    # Maharashtra
    'Ahmednagar': 'MAHARASHTRA', 'Akola': 'MAHARASHTRA', 'Amravati': 'MAHARASHTRA', 'Aurangabad': 'MAHARASHTRA', 'Beed': 'MAHARASHTRA', 'Bhandara': 'MAHARASHTRA', 'Buldhana': 'MAHARASHTRA', 'Chandrapur': 'MAHARASHTRA', 'Dhule': 'MAHARASHTRA', 'Gadchiroli': 'MAHARASHTRA', 'Gondia': 'MAHARASHTRA', 'Hingoli': 'MAHARASHTRA', 'Jalgaon': 'MAHARASHTRA', 'Jalna': 'MAHARASHTRA', 'Kolhapur': 'MAHARASHTRA', 'Latur': 'MAHARASHTRA', 'Mumbai': 'MAHARASHTRA', 'Mumbai Suburban': 'MAHARASHTRA', 'Nagpur': 'MAHARASHTRA', 'Nanded': 'MAHARASHTRA', 'Nandurbar': 'MAHARASHTRA', 'Nashik': 'MAHARASHTRA', 'Osmanabad': 'MAHARASHTRA', 'Palghar': 'MAHARASHTRA', 'Parbhani': 'MAHARASHTRA', 'Pune': 'MAHARASHTRA', 'Raigad': 'MAHARASHTRA', 'Ratnagiri': 'MAHARASHTRA', 'Sangli': 'MAHARASHTRA', 'Satara': 'MAHARASHTRA', 'Sindhudurg': 'MAHARASHTRA', 'Solapur': 'MAHARASHTRA', 'Thane': 'MAHARASHTRA', 'Wardha': 'MAHARASHTRA', 'Washim': 'MAHARASHTRA', 'Yavatmal': 'MAHARASHTRA',
    # Manipur
    'Bishnupur': 'MANIPUR', 'Chandel': 'MANIPUR', 'Churachandpur': 'MANIPUR', 'Imphal East': 'MANIPUR', 'Imphal West': 'MANIPUR', 'Jiribam': 'MANIPUR', 'Kakching': 'MANIPUR', 'Kamjong': 'MANIPUR', 'Kangpokpi': 'MANIPUR', 'Noney': 'MANIPUR', 'Pherzawl': 'MANIPUR', 'Senapati': 'MANIPUR', 'Tamenglong': 'MANIPUR', 'Tengnoupal': 'MANIPUR', 'Thoubal': 'MANIPUR', 'Ukhrul': 'MANIPUR',
    # Meghalaya
    'East Garo Hills': 'MEGHALAYA', 'East Jaintia Hills': 'MEGHALAYA', 'East Khasi Hills': 'MEGHALAYA', 'North Garo Hills': 'MEGHALAYA', 'Ri Bhoi': 'MEGHALAYA', 'South Garo Hills': 'MEGHALAYA', 'South West Garo Hills': 'MEGHALAYA', 'South West Khasi Hills': 'MEGHALAYA', 'West Garo Hills': 'MEGHALAYA', 'West Jaintia Hills': 'MEGHALAYA', 'West Khasi Hills': 'MEGHALAYA',
    # Mizoram
    'Aizawl': 'MIZORAM', 'Champhai': 'MIZORAM', 'Hnahthial': 'MIZORAM', 'Khawzawl': 'MIZORAM', 'Kolasib': 'MIZORAM', 'Lawngtlai': 'MIZORAM', 'Lunglei': 'MIZORAM', 'Mamit': 'MIZORAM', 'Saiha': 'MIZORAM', 'Saitual': 'MIZORAM', 'Serchhip': 'MIZORAM',
    # Nagaland
    'Dimapur': 'NAGALAND', 'Kiphire': 'NAGALAND', 'Kohima': 'NAGALAND', 'Longleng': 'NAGALAND', 'Mokokchung': 'NAGALAND', 'Mon': 'NAGALAND', 'Peren': 'NAGALAND', 'Phek': 'NAGALAND', 'Tuensang': 'NAGALAND', 'Wokha': 'NAGALAND', 'Zunheboto': 'NAGALAND',
    # Odisha
    'Angul': 'ODISHA', 'Balangir': 'ODISHA', 'Balasore': 'ODISHA', 'Bargarh': 'ODISHA', 'Bhadrak': 'ODISHA', 'Boudh': 'ODISHA', 'Cuttack': 'ODISHA', 'Deogarh': 'ODISHA', 'Dhenkanal': 'ODISHA', 'Gajapati': 'ODISHA', 'Ganjam': 'ODISHA', 'Jagatsinghapur': 'ODISHA', 'Jajpur': 'ODISHA', 'Jharsuguda': 'ODISHA', 'Kalahandi': 'ODISHA', 'Kandhamal': 'ODISHA', 'Kendrapara': 'ODISHA', 'Kendujhar (Keonjhar)': 'ODISHA', 'Khordha': 'ODISHA', 'Koraput': 'ODISHA', 'Malkangiri': 'ODISHA', 'Mayurbhanj': 'ODISHA', 'Nabarangpur': 'ODISHA', 'Nayagarh': 'ODISHA', 'Nuapada': 'ODISHA', 'Puri': 'ODISHA', 'Rayagada': 'ODISHA', 'Sambalpur': 'ODISHA', 'Sonepur': 'ODISHA', 'Sundargarh': 'ODISHA',
    # Puducherry
    'Karaikal': 'PUDUCHERRY', 'Mahe': 'PUDUCHERRY', 'Puducherry': 'PUDUCHERRY', 'Yanam': 'PUDUCHERRY',
    # Punjab
    'Amritsar': 'PUNJAB', 'Barnala': 'PUNJAB', 'Bathinda': 'PUNJAB', 'Faridkot': 'PUNJAB', 'Fatehgarh Sahib': 'PUNJAB', 'Fazilka': 'PUNJAB', 'Ferozepur': 'PUNJAB', 'Gurdaspur': 'PUNJAB', 'Hoshiarpur': 'PUNJAB', 'Jalandhar': 'PUNJAB', 'Kapurthala': 'PUNJAB', 'Ludhiana': 'PUNJAB', 'Mansa': 'PUNJAB', 'Moga': 'PUNJAB', 'Muktsar': 'PUNJAB', 'Pathankot': 'PUNJAB', 'Patiala': 'PUNJAB', 'Rupnagar': 'PUNJAB', 'Sahibzada Ajit Singh Nagar (Mohali)': 'PUNJAB', 'Sangrur': 'PUNJAB', 'Shahid Bhagat Singh Nagar (Nawanshahr)': 'PUNJAB', 'Tarn Taran': 'PUNJAB',
    # Rajasthan
    'Ajmer': 'RAJASTHAN', 'Alwar': 'RAJASTHAN', 'Banswara': 'RAJASTHAN', 'Baran': 'RAJASTHAN', 'Barmer': 'RAJASTHAN', 'Bharatpur': 'RAJASTHAN', 'Bhilwara': 'RAJASTHAN', 'Bikaner': 'RAJASTHAN', 'Bundi': 'RAJASTHAN', 'Chittorgarh': 'RAJASTHAN', 'Churu': 'RAJASTHAN', 'Dausa': 'RAJASTHAN', 'Dholpur': 'RAJASTHAN', 'Dungarpur': 'RAJASTHAN', 'Hanumangarh': 'RAJASTHAN', 'Jaipur': 'RAJASTHAN', 'Jaisalmer': 'RAJASTHAN', 'Jalore': 'RAJASTHAN', 'Jhalawar': 'RAJASTHAN', 'Jhunjhunu': 'RAJASTHAN', 'Jodhpur': 'RAJASTHAN', 'Karauli': 'RAJASTHAN', 'Kota': 'RAJASTHAN', 'Nagaur': 'RAJASTHAN', 'Pali': 'RAJASTHAN', 'Pratapgarh': 'RAJASTHAN', 'Rajsamand': 'RAJASTHAN', 'Sawai Madhopur': 'RAJASTHAN', 'Sikar': 'RAJASTHAN', 'Sirohi': 'RAJASTHAN', 'Sri Ganganagar': 'RAJASTHAN', 'Tonk': 'RAJASTHAN', 'Udaipur': 'RAJASTHAN',
    # Sikkim
    'East Sikkim': 'SIKKIM', 'North Sikkim': 'SIKKIM', 'South Sikkim': 'SIKKIM', 'West Sikkim': 'SIKKIM',
    # Tamil Nadu
    'Ariyalur': 'TAMIL NADU', 'Chengalpattu': 'TAMIL NADU', 'Chennai': 'TAMIL NADU', 'Coimbatore': 'TAMIL NADU', 'Cuddalore': 'TAMIL NADU', 'Dharmapuri': 'TAMIL NADU', 'Dindigul': 'TAMIL NADU', 'Erode': 'TAMIL NADU', 'Kallakurichi': 'TAMIL NADU', 'Kancheepuram': 'TAMIL NADU', 'Kanyakumari': 'TAMIL NADU', 'Karur': 'TAMIL NADU', 'Krishnagiri': 'TAMIL NADU', 'Madurai': 'TAMIL NADU', 'Mayiladuthurai': 'TAMIL NADU', 'Nagapattinam': 'TAMIL NADU', 'Namakkal': 'TAMIL NADU', 'Nilgiris': 'TAMIL NADU', 'Perambalur': 'TAMIL NADU', 'Pudukkottai': 'TAMIL NADU', 'Ramanathapuram': 'TAMIL NADU', 'Ranipet': 'TAMIL NADU', 'Salem': 'TAMIL NADU', 'Sivaganga': 'TAMIL NADU', 'Tenkasi': 'TAMIL NADU', 'Thanjavur': 'TAMIL NADU', 'Theni': 'TAMIL NADU', 'Thoothukudi (Tuticorin)': 'TAMIL NADU', 'Tiruchirappalli': 'TAMIL NADU', 'Tirunelveli': 'TAMIL NADU', 'Tirupathur': 'TAMIL NADU', 'Tiruppur': 'TAMIL NADU', 'Tiruvallur': 'TAMIL NADU', 'Tiruvannamalai': 'TAMIL NADU', 'Tiruvarur': 'TAMIL NADU', 'Vellore': 'TAMIL NADU', 'Viluppuram': 'TAMIL NADU', 'Virudhunagar': 'TAMIL NADU',
    # Telangana
    'Adilabad': 'TELANGANA', 'Bhadradri Kothagudem': 'TELANGANA', 'Hyderabad': 'TELANGANA', 'Jagtial': 'TELANGANA', 'Jangaon': 'TELANGANA', 'Jayashankar Bhupalpally': 'TELANGANA', 'Jogulamba Gadwal': 'TELANGANA', 'Kamareddy': 'TELANGANA', 'Karimnagar': 'TELANGANA', 'Khammam': 'TELANGANA', 'Komaram Bheem Asifabad': 'TELANGANA', 'Mahabubabad': 'TELANGANA', 'Mahabubnagar': 'TELANGANA', 'Mancherial': 'TELANGANA', 'Medak': 'TELANGANA', 'Medchal': 'TELANGANA', 'Nagarkurnool': 'TELANGANA', 'Nalgonda': 'TELANGANA', 'Nirmal': 'TELANGANA', 'Nizamabad': 'TELANGANA', 'Peddapalli': 'TELANGANA', 'Rajanna Sircilla': 'TELANGANA', 'Rangareddy': 'TELANGANA', 'Sangareddy': 'TELANGANA', 'Siddipet': 'TELANGANA', 'Suryapet': 'TELANGANA', 'Vikarabad': 'TELANGANA', 'Wanaparthy': 'TELANGANA', 'Warangal (Rural)': 'TELANGANA', 'Warangal (Urban)': 'TELANGANA', 'Yadadri Bhuvanagiri': 'TELANGANA',
    # Tripura
    'Dhalai': 'TRIPURA', 'Gomati': 'TRIPURA', 'Khowai': 'TRIPURA', 'North Tripura': 'TRIPURA', 'Sepahijala': 'TRIPURA', 'South Tripura': 'TRIPURA', 'Unakoti': 'TRIPURA', 'West Tripura': 'TRIPURA',
    # Uttar Pradesh
    'Agra': 'UTTAR PRADESH', 'Aligarh': 'UTTAR PRADESH', 'Allahabad': 'UTTAR PRADESH', 'Ambedkar Nagar': 'UTTAR PRADESH', 'Amethi (Chatrapati Sahuji Mahraj Nagar)': 'UTTAR PRADESH', 'Amroha (J.P. Nagar)': 'UTTAR PRADESH', 'Auraiya': 'UTTAR PRADESH', 'Azamgarh': 'UTTAR PRADESH', 'Baghpat': 'UTTAR PRADESH', 'Bahraich': 'UTTAR PRADESH', 'Ballia': 'UTTAR PRADESH', 'Balrampur': 'UTTAR PRADESH', 'Banda': 'UTTAR PRADESH', 'Barabanki': 'UTTAR PRADESH', 'Bareilly': 'UTTAR PRADESH', 'Basti': 'UTTAR PRADESH', 'Bhadohi': 'UTTAR PRADESH', 'Bijnor': 'UTTAR PRADESH', 'Budaun': 'UTTAR PRADESH', 'Bulandshahr': 'UTTAR PRADESH', 'Chandauli': 'UTTAR PRADESH', 'Chitrakoot': 'UTTAR PRADESH', 'Deoria': 'UTTAR PRADESH', 'Etah': 'UTTAR PRADESH', 'Etawah': 'UTTAR PRADESH', 'Faizabad': 'UTTAR PRADESH', 'Farrukhabad': 'UTTAR PRADESH', 'Fatehpur': 'UTTAR PRADESH', 'Firozabad': 'UTTAR PRADESH', 'Gautam Buddh Nagar': 'UTTAR PRADESH', 'Ghaziabad': 'UTTAR PRADESH', 'Ghazipur': 'UTTAR PRADESH', 'Gonda': 'UTTAR PRADESH', 'Gorakhpur': 'UTTAR PRADESH', 'Hamirpur': 'UTTAR PRADESH', 'Hapur (Panchsheel Nagar)': 'UTTAR PRADESH', 'Hardoi': 'UTTAR PRADESH', 'Hathras (Mahamaya Nagar)': 'UTTAR PRADESH', 'Jalaun': 'UTTAR PRADESH', 'Jaunpur': 'UTTAR PRADESH', 'Jhansi': 'UTTAR PRADESH', 'Kannauj': 'UTTAR PRADESH', 'Kanpur Dehat': 'UTTAR PRADESH', 'Kanpur Nagar': 'UTTAR PRADESH', 'Kasganj (Kanshiram Nagar)': 'UTTAR PRADESH', 'Kaushambi': 'UTTAR PRADESH', 'Kushinagar (Padrauna)': 'UTTAR PRADESH', 'Lakhimpur - Kheri': 'UTTAR PRADESH', 'Lalitpur': 'UTTAR PRADESH', 'Lucknow': 'UTTAR PRADESH', 'Maharajganj': 'UTTAR PRADESH', 'Mahoba': 'UTTAR PRADESH', 'Mainpuri': 'UTTAR PRADESH', 'Mathura': 'UTTAR PRADESH', 'Mau': 'UTTAR PRADESH', 'Meerut': 'UTTAR PRADESH', 'Mirzapur': 'UTTAR PRADESH', 'Moradabad': 'UTTAR PRADESH', 'Muzaffarnagar': 'UTTAR PRADESH', 'Pilibhit': 'UTTAR PRADESH', 'Pratapgarh': 'UTTAR PRADESH', 'RaeBareli': 'UTTAR PRADESH', 'Rampur': 'UTTAR PRADESH', 'Saharanpur': 'UTTAR PRADESH', 'Sambhal (Bhim Nagar)': 'UTTAR PRADESH', 'Sant Kabir Nagar': 'UTTAR PRADESH', 'Shahjahanpur': 'UTTAR PRADESH', 'Shamli': 'UTTAR PRADESH', 'Shravasti': 'UTTAR PRADESH', 'Siddharth Nagar': 'UTTAR PRADESH', 'Sitapur': 'UTTAR PRADESH', 'Sonbhadra': 'UTTAR PRADESH', 'Sultanpur': 'UTTAR PRADESH', 'Unnao': 'UTTAR PRADESH', 'Varanasi': 'UTTAR PRADESH', 'Noida': 'UTTAR PRADESH',
    # Uttarakhand
    'Almora': 'UTTARAKHAND', 'Bageshwar': 'UTTARAKHAND', 'Chamoli': 'UTTARAKHAND', 'Champawat': 'UTTARAKHAND', 'Dehradun': 'UTTARAKHAND', 'Haridwar': 'UTTARAKHAND', 'Nainital': 'UTTARAKHAND', 'Pauri Garhwal': 'UTTARAKHAND', 'Pithoragarh': 'UTTARAKHAND', 'Rudraprayag': 'UTTARAKHAND', 'Tehri Garhwal': 'UTTARAKHAND', 'Udham Singh Nagar': 'UTTARAKHAND', 'Uttarkashi': 'UTTARAKHAND',
    # West Bengal
    'Alipurduar': 'WEST BENGAL', 'Bankura': 'WEST BENGAL', 'Birbhum': 'WEST BENGAL', 'Cooch Behar': 'WEST BENGAL', 'Dakshin Dinajpur (South Dinajpur)': 'WEST BENGAL', 'Darjeeling': 'WEST BENGAL', 'Hooghly': 'WEST BENGAL', 'Howrah': 'WEST BENGAL', 'Jalpaiguri': 'WEST BENGAL', 'Jhargram': 'WEST BENGAL', 'Kalimpong': 'WEST BENGAL', 'Kolkata': 'WEST BENGAL', 'Malda': 'WEST BENGAL', 'Murshidabad': 'WEST BENGAL', 'Nadia': 'WEST BENGAL', 'North 24 Parganas': 'WEST BENGAL', 'Paschim Medinipur (West Medinipur)': 'WEST BENGAL', 'Paschim (West) Burdwan': 'WEST BENGAL', 'Purba Burdwan (Bardhaman)': 'WEST BENGAL', 'Purba Medinipur (East Medinipur)': 'WEST BENGAL', 'Purulia': 'WEST BENGAL', 'South 24 Parganas': 'WEST BENGAL', 'Uttar Dinajpur (North Dinajpur)': 'WEST BENGAL',
    '24 PARAGANAS NORTH': 'WEST BENGAL', '24 PARAGANAS SOUTH': 'WEST BENGAL',
    # Andaman & Nicobar Islands
    'Nicobars': 'ANDAMAN AND NICOBAR ISLANDS', 'South Andamans': 'ANDAMAN AND NICOBAR ISLANDS', 'North And Middle Andaman': 'ANDAMAN AND NICOBAR ISLANDS',
    # Additional Arunachal Pradesh districts
    'Kamle': 'ARUNACHAL PRADESH',
    # Additional Chhattisgarh districts
    'Manendragarh Chirimiri Bharatpur': 'CHHATTISGARH', 'MANENDRAGARH CHIRIMIRI BHARATPUR': 'CHHATTISGARH',
}

# --- Archetype Engine: The Core of the Smart Generation ---
ARCHETYPES = {
    "core_it_dev": {
        "name": "Core IT Developer",
        "sectors": ["IT and Software Development", "Banking and financial Services"],
        "qualifications": ["Graduation"],
        "courses": ["B.Tech/B.E.", "BCA", "MCA"],
        "specializations": ["Computer Science", "Information Technology", "Computer Engineering"],
        "skill_keywords": ["Python", "Java", "SQL", "Git", "Data Structures", "Algorithms", "REST APIs"],
        "cert_keywords": ["AWS Certified Cloud Practitioner", "Oracle Certified Associate, Java Programmer"],
        "location_bias": ["Bengaluru Urban", "Hyderabad", "Pune", "Gurugram", "Noida", "Chennai"],
        "description_template": "Seeking a motivated {course} graduate in {specialization} to join our backend development team. Responsibilities include writing clean code, developing REST APIs, and collaborating with cross-functional teams. Must have a strong understanding of {skill1} and {skill2}."
    },
    "data_analytics": {
        "name": "Data Analyst",
        "sectors": ["IT and Software Development", "Banking and financial Services", "Retail & Consumer Durables", "Healthcare"],
        "qualifications": ["Graduation"],
        "courses": ["B.Tech/B.E.", "B.Sc./B.Tech", "BBA"],
        "specializations": ["Data Science", "Statistics", "Information Technology", "Finance"],
        "skill_keywords": ["SQL", "Python", "R", "Tableau", "Power BI", "Excel", "Statistical Analysis"],
        "cert_keywords": ["Google Data Analytics Professional Certificate", "Microsoft Power BI Data Analyst Associate"],
        "location_bias": ["Bengaluru Urban", "Mumbai", "Gurugram", "Hyderabad"],
        "description_template": "We are looking for an analytical mind with a degree in {specialization}. The role involves cleaning and analyzing large datasets, creating insightful dashboards, and presenting findings to stakeholders. Proficiency in {skill1} and {skill2} is essential."
    },
    "core_engineering": {
        "name": "Core Engineering",
        "sectors": ["Manufacturing & Industrial", "Automotive", "Metals & Mining", "Infrastructure & Construction"],
        "qualifications": ["Graduation", "Diploma"],
        "courses": ["B.Tech/B.E.", "Diploma in Engineering"],
        "specializations": ["Mechanical", "Electrical", "Civil", "Automobile"],
        "skill_keywords": ["AutoCAD", "SolidWorks", "Quality Assurance", "Production Management", "PLC Programming"],
        "cert_keywords": ["Six Sigma Green Belt", "AutoCAD Certified Professional"],
        "location_bias": ["Pune", "Chennai", "Ahmedabad", "Jamshedpur", "Coimbatore"],
        "description_template": "Internship opportunity for a {course} in {specialization}. The intern will work on the shop floor, assist in process optimization, and contribute to quality control measures. Hands-on experience with {skill1} is a plus."
    },
    "business_sales": {
        "name": "Business & Sales",
        "sectors": ["FMCG (Fast-Moving Consumer Goods)", "Retail & Consumer Durables", "Banking and financial Services", "Telecom"],
        "qualifications": ["Graduation", "12th"],
        "courses": ["BBA", "B.Com", "HSC"],
        "specializations": ["Marketing", "Finance", "Sales", "Business Administration"],
        "skill_keywords": ["Client Relationship Management", "Lead Generation", "Market Research", "Negotiation", "MS Office"],
        "cert_keywords": ["HubSpot Sales Software Certified", "Google Ads Search Certification"],
        "location_bias": ["Mumbai", "Delhi", "Kolkata", "Ahmedabad", "Bengaluru Urban"],
        "description_template": "Dynamic intern required for our sales and marketing team. The role involves market research, lead generation, and supporting the sales team. A {course} in {specialization} is preferred. Excellent communication and interpersonal skills are a must."
    },
    "entry_level_ops": {
        "name": "Entry-Level Operations",
        "sectors": ["Travel & Hospitality", "Agriculture and allied", "Logistics"],
        "qualifications": ["ITI", "12th", "Diploma"],
        "courses": ["ITI Certificate", "HSC", "Polytechnic Diploma"],
        "specializations": ["Fitter", "Electrician", "General Stream", "Hospitality Management"],
        "skill_keywords": ["Operations Management", "Inventory Control", "Customer Service", "Team Coordination"],
        "cert_keywords": [],
        "location_bias": [],
        "description_template": "We are hiring interns for our operations team. This is a hands-on role requiring attention to detail and good teamwork. A {course} is required. The intern will assist with day-to-day operational tasks."
    }
}

# Global list of all available states derived from the mapping
ALL_STATES = sorted(list(set(DISTRICT_TO_STATE_MAPPING.values())) + ['ANDAMAN AND NICOBAR ISLANDS'])

def read_lines_from_file(filename):
    """Reads a file and returns a list of its lines, stripped of whitespace."""
    filepath = Path(filename)
    if not filepath.exists():
        print(f"Error: Input file '{filename}' not found. Please create it.")
        sys.exit(1)
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]
    if not lines:
        print(f"Error: Input file '{filename}' is empty. Please add values.")
        sys.exit(1)
    return lines

# District name normalization and alternate mappings
DISTRICT_ALTERNATES = {
    # Common variations and misspellings
    'ganganagar': 'Sri Ganganagar',
    'ayodhya': 'Faizabad',
    'visakhapatanam': 'Visakhapatnam',
    'belagavi': 'Belagavi (Belgaum)',
    'bandipora': 'Bandipore',
    'gautam buddha nagar': 'Gautam Buddh Nagar',
    'leh ladakh': 'Leh',
    'the nilgiris': 'Nilgiris',
    'korea': 'Korea (Koriya)',
    'namchi': 'South Sikkim',  # Namchi is in South Sikkim
    'gangtok': 'East Sikkim',  # Gangtok is in East Sikkim
    'gyalshing': 'West Sikkim',  # Gyalshing is in West Sikkim
    'pakyong': 'East Sikkim',   # Pakyong is in East Sikkim
    'mysuru': 'Mysuru (Mysore)',
    'ballari': 'Ballari (Bellary)',
    'kalaburagi': 'Kalaburagi (Gulbarga)',
    'shivamogga': 'Shivamogga (Shimoga)',
    'tumakuru': 'Tumakuru (Tumkur)',
    'chikkamagaluru': 'Chikkamagaluru (Chikmagalur)',
    'chikkaballapura': 'Chikballapur',
    'bagalkote': 'Bagalkot',
    'chamarajanagara': 'Chamarajanagar',
    'vijayapura': 'Vijayapura (Bijapur)',
    'uttara kannada': 'Uttara Kannada (Karwar)',
    'belagavi': 'Belagavi (Belgaum)',
    'thiruvallur': 'Tiruvallur',
    'thiruvarur': 'Tiruvarur',
    'kanniyakumari': 'Kanyakumari',
    'tuticorin': 'Thoothukudi (Tuticorin)',
    'villupuram': 'Viluppuram',
    'kanchipuram': 'Kancheepuram',
    'jagitial': 'Jagtial',
    'warangal': 'Warangal (Urban)',
    'hanumakonda': 'Warangal (Rural)',
    'ranga reddy': 'Rangareddy',
    'medchal malkajgiri': 'Medchal',
    'jayashankar bhupalapally': 'Jayashankar Bhupalpally',
    'kumuram bheem asifabad': 'Komaram Bheem Asifabad',
    'narayanpet': 'Wanaparthy',  # Close district
    'jangoan': 'Jangaon',
    'mulugu': 'Mahabubabad',  # Close district
    'ntr': 'NTR',
    'y.s.r.': 'Y.S.R. Kadapa (Cuddapah)',
    'spsr nellore': 'Nellore',
    'anantapur': 'Anantapur',
    'kheri': 'Lakhimpur - Kheri',
    'purnia': 'Purnia (Purnea)',
    'munger': 'Munger (Monghyr)',
    'east singhbum': 'East Singhbhum',
    'saraikela kharsawan': 'Seraikela-Kharsawan',
    'hazaribagh': 'Hazaribag',
    'kendujhar': 'Kendujhar (Keonjhar)',
    'anugul': 'Angul',
    'baleshwar': 'Balasore',
    'jajapur': 'Jajpur',
    'purba bardhaman': 'Purba Burdwan (Bardhaman)',
    'paschim bardhaman': 'Paschim (West) Burdwan',
    'purbi champaran': 'East Champaran (Motihari)',
    'pashchim champaran': 'West Champaran',
    'rae bareli': 'RaeBareli',
    'prayagraj': 'Allahabad',
    'kasganj': 'Kasganj (Kanshiram Nagar)',
    'hathras': 'Hathras (Mahamaya Nagar)',
    'hapur': 'Hapur (Panchsheel Nagar)',
    'sambhal': 'Sambhal (Bhim Nagar)',
    'amethi': 'Amethi (Chatrapati Sahuji Mahraj Nagar)',
    'amroha': 'Amroha (J.P. Nagar)',
    'udam singh nagar': 'Udham Singh Nagar',
    'uttar kashi': 'Uttarkashi',
    'rudra prayag': 'Rudraprayag',
    'lahaul and spiti': 'Lahaul & Spiti',
    'sirmaur': 'Sirmaur (Sirmour)',
    'charki dadri': 'Charkhi Dadri',
    's.a.s nagar': 'Sahibzada Ajit Singh Nagar (Mohali)',
    'shahid bhagat singh nagar': 'Shahid Bhagat Singh Nagar (Nawanshahr)',
    'sri muktsar sahib': 'Muktsar',
    'malerkotla': 'Moga',  # Malerkotla is now separate but close to Moga
    'ganganagar': 'Sri Ganganagar',
    'dudu': 'Jaipur',  # Dudu is in Jaipur district
    'beawar': 'Ajmer',  # Beawar is in Ajmer district
    'phalodi': 'Jodhpur',  # Phalodi is in Jodhpur district
    'sanchor': 'Jalore',  # Sanchor is in Jalore district
    'didwana kuchaman': 'Nagaur',  # Didwana-Kuchaman is in Nagaur district
    'khairthal-tijara': 'Alwar',  # New district carved from Alwar
    'kotputli-behror': 'Alwar',   # New district carved from Alwar
    'deeg': 'Bharatpur',  # New district carved from Bharatpur
    'salumbar': 'Udaipur',  # Salumbar is in Udaipur district
    'gangapurcity': 'Sawai Madhopur',  # Part of Sawai Madhopur
    'shahpura': 'Bhilwara',  # Shahpura is in Bhilwara district
    'kekri': 'Ajmer',  # Kekri is in Ajmer district
    'neem ka thana': 'Sikar',  # Neem Ka Thana is in Sikar district
    'jaipur gramin': 'Jaipur',  # Rural Jaipur
    'jodhpur gramin': 'Jodhpur',  # Rural Jodhpur
    'balotra': 'Barmer',  # Balotra is in Barmer district
    'anoopgarh': 'Sri Ganganagar',  # Anoopgarh is in Sri Ganganagar
    'banas kantha': 'Banaskantha (Palanpur)',
    'panch mahals': 'Panchmahal (Godhra)',
    'sabar kantha': 'Sabarkantha (Himmatnagar)',
    'mahesana': 'Mehsana',
    'kheda': 'Kheda (Nadiad)',
    'arvalli': 'Aravalli',
    'devbhumi dwarka': 'Devbhoomi Dwarka',
    'chhotaudepur': 'Chhota Udepur',
    'narmada': 'Narmada (Rajpipla)',
    'tapi': 'Tapi (Vyara)',
    'kamrup metro': 'Kamrup Metropolitan',
    'marigaon': 'Morigaon',
    'gariyaband': 'Gariaband',
    'uttar bastar kanker': 'Kanker (Uttar Bastar)',
    'sarangarh bilaigarh': 'Raigarh',  # Part of Raigarh region
    'baloda bazar': 'Balod',  # Close district
    'manendragarh chirimiri bharatpur': 'Koriya',  # Part of Koriya region
    'pandhurna': 'Chhindwara',  # Pandhurna is in Chhindwara
    'niwari': 'Tikamgarh',  # Niwari is close to Tikamgarh
    'narmadapuram': 'Hoshangabad',  # Narmadapuram was Hoshangabad
    'agar malwa': 'Agar Malwa',
    'khargone': 'Khargone',
    'east nimar': 'Khandwa',  # East Nimar is Khandwa
    'narsinghpur': 'Narsinghpur',
    'chhatrapati sambhajinagar': 'Aurangabad',  # Renamed Aurangabad
    'kabirdham': 'Kabirdham (Kawardha)',
    'dantewada': 'Dantewada (Dakshin Bastar)',
    'balrampur': 'Balrampur',
    'shravasti': 'Shravasti',
    'sant kabeer nagar': 'Sant Kabir Nagar',
    'kushi nagar': 'Kushinagar (Padrauna)',
    'siddharth nagar': 'Siddharth Nagar',
    'maharajganj': 'Maharajganj',
    'coochbehar': 'Cooch Behar',
    'maldah': 'Malda',
    'medinipur west': 'Paschim Medinipur (West Medinipur)',
    'medinipur east': 'Purba Medinipur (East Medinipur)',
    'dinajpur uttar': 'Uttar Dinajpur (North Dinajpur)',
    'dinajpur dakshin': 'Dakshin Dinajpur (South Dinajpur)',
    'khairgarh chhuikhadan gandai': 'Rajnandgaon',  # Part of Rajnandgaon region
    'saiha': 'Saiha',  # Valid Mizoram district
    'kamle': 'Kamle',  # Valid Arunachal Pradesh district
    'lower dibang valley': 'Lohit',  # Close district in AP
    'nicobars': 'Nicobar',  # Andaman & Nicobar
    'north and middle andaman': 'North And Middle Andaman',
    'south andamans': 'South Andaman',
    'lakshadweep district': 'Lakshadweep',
    'dadra and nagar haveli': 'Dadra and Nagar Haveli',
    'pondicherry': 'Puducherry',
    'vijayanagar': 'Ballari (Bellary)',  # Vijayanagar empire region, close to Ballari
    # Delhi regions
    'new delhi': 'New Delhi',
    'central': 'Central Delhi',
    'north': 'North Delhi',
    'south': 'South Delhi',
    'east': 'East Delhi',
    'west': 'West Delhi',
    'north east': 'North East Delhi',
    'north west': 'North West Delhi',
    'south east': 'South East Delhi',
    'south west': 'South West Delhi',
    'shahdara': 'Shahdara',
    'barabanki': 'Barabanki',
    'visakhapatanam': 'Visakhapatnam',
}

def normalize_district_name(district_name):
    """Normalize district name to handle variations and find correct mapping."""
    if not district_name:
        return district_name
    
    # Convert to lowercase for comparison
    normalized = district_name.lower().strip()
    
    # Check if it's in our alternates mapping
    if normalized in DISTRICT_ALTERNATES:
        return DISTRICT_ALTERNATES[normalized]
    
    # Return original if no alternate found
    return district_name

def get_valid_choice(available_options, archetype_preferences):
    """Chooses from archetype preferences if they exist in the available options, otherwise falls back."""
    valid_preferences = [p for p in archetype_preferences if p in available_options]
    if valid_preferences:
        return random.choice(valid_preferences)
    return random.choice(available_options)

def main():
    """Main function to generate the diverse and realistic dataset."""
    print("--- PMIS Diverse Dummy Data Generator (State-Aware) ---")

    print("Loading master data from .txt files...")
    try:
        master_data = {key: read_lines_from_file(filename) for key, filename in INPUT_FILES.items()}
    except SystemExit:
        return

    all_internships = []
    archetype_keys = list(ARCHETYPES.keys())
    print(f"Generating {NUM_RECORDS_TO_GENERATE} records using archetype engine...")
    print("State/UT will be automatically derived from the chosen district.")

    for _ in range(NUM_RECORDS_TO_GENERATE):
        archetype_key = random.choice(archetype_keys)
        archetype = ARCHETYPES[archetype_key]

        sector = get_valid_choice(master_data["sectors"], archetype["sectors"])
        min_qualification = get_valid_choice(master_data["qualifications"], archetype["qualifications"])
        course = random.choice(archetype["courses"])
        specialization = random.choice(archetype["specializations"])

        skills = ["Communication Skills", "Teamwork"]
        skills.extend(random.sample(archetype["skill_keywords"], k=random.randint(2, 3)))
        random.shuffle(skills)

        description = archetype["description_template"].format(
            course=course,
            specialization=specialization,
            skill1=skills[2],
            skill2=skills[3] if len(skills) > 3 else skills[0]
        )

        # --- Location Logic with Automatic State Derivation ---
        if archetype["location_bias"] and random.random() < 0.7:
            valid_biased_districts = [d for d in archetype["location_bias"] if d in master_data["districts"]]
            district = random.choice(valid_biased_districts) if valid_biased_districts else random.choice(master_data["districts"])
        else:
            district = random.choice(master_data["districts"])
        
        # Normalize district name and try to find mapping
        normalized_district = normalize_district_name(district)
        
        # Derive state from the normalized district, with fallback
        state_ut = DISTRICT_TO_STATE_MAPPING.get(normalized_district)
        
        if state_ut is None:
            # Try original district name if normalized didn't work
            state_ut = DISTRICT_TO_STATE_MAPPING.get(district)
            
        if state_ut is None:
            # Final fallback to random state
            state_ut = random.choice(ALL_STATES)
            print(f"Warning: District '{district}' not found in mapping. Assigned a random state: '{state_ut}'.")


        internship = {
            "internship_type": "Corporate (12 months)" if min_qualification == "Graduation" else random.choice(["Public Sector (Short Term)", "Corporate (12 months)"]),
            "sector": sector,
            "area/field": random.choice(archetype["skill_keywords"]),
            "no_of_opportunities": random.randint(1, 15),
            "description": description,
            "state/ut": state_ut,
            "district": district,
            "minimum_qualification": min_qualification,
            "course": course,
            "specialization": specialization,
            "preferred_skills": skills,
            "certification_name": [random.choice(archetype["cert_keywords"])] if archetype["cert_keywords"] and random.random() > 0.6 else [],
            "special_requirements": ["Police Verification", "NOC from University", "PAN mandatory"] if random.random() > 0.7 else []
        }
        all_internships.append(internship)

    try:
        with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
            json.dump(all_internships, f, indent=2, ensure_ascii=False)
        print(f"\nSuccess! ✅\nGenerated {len(all_internships)} diverse records and saved them to '{OUTPUT_FILENAME}'")
    except IOError as e:
        print(f"\nError: Could not write to file '{OUTPUT_FILENAME}'.\nDetails: {e}")

if __name__ == "__main__":
    main()