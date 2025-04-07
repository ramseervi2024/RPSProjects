import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ECommerceBottomNavigation from '../Apps/ECommerce/ECommerceBottomNavigation';
import AllApps from '../AllApps';
import VillageCommunityNavigation from '../Apps/VillageCommunity/VillageCommunityNavigation';
import SocialMediaNavigation from '../Apps/SocialMediaApps/SocialMediaNavigation';
import FoodDeliveryNavigation from '../Apps/FoodDelivery/FoodDeliveryNavigation';
import RidesBookingNavigation from '../Apps/RidesBooking/RidesBookingNavigation';
import EducationAppsNavigation from '../Apps/EducationApps/EducationAppsNavigation';
import GamingAppsNavigation from '../Apps/GamingApps/GamingAppsNavigation';
import FinanceAppsNavigation from '../Apps/FinanceApps/FinanceAppsNavigation';
import EventTicketingNavigation from '../Apps/EventTicketing/EventTicketingNavigation';
import LiveStreamingNavigation from '../Apps/LiveStreaming/LiveStreamingNavigation';
import RealEstateNavigation from '../Apps/RealEstate/RealEstateNavigation';
import JobFreelanceNavigation from '../Apps/JobFreelance/JobFreelanceNavigation';
import TravelTourismNavigation from '../Apps/TravelTourism/TravelTourismNavigation';
import B2BAppNavigation from '../Apps/B2BApp/B2BAppNavigation';
import NewsMagazineNavigation from '../Apps/NewsMagazine/NewsMagazineNavigation';
import SmartHomeManagementNavigation from '../Apps/SmartHomeManagement/SmartHomeManagementNavigation';
import DatingAppSetupNavigation from '../Apps/DatingAppSetup/DatingAppSetupNavigation';
import DashboardManagementNavigation from '../Apps/DashboardManagement/DashboardManagementNavigation';
import FashionTrendAppsNavigation from '../Apps/FashionTrendApps/FashionTrendAppsNavigation';
import SportsFitnessNavigation from '../Apps/SportsFitness/SportsFitnessNavigation';
import RajasthanTouristNavigation from '../Apps/RajasthanTourist/RajasthanTouristNavigation';
import MyVillageNavigation from '../Apps/MyVillage/MyVillageNavigation';
import KisanMarketNavigation from '../Apps/KisanMarket/KisanMarketNavigation';
import TransportLogisticsNavigation from '../Apps/TransportLogistics/TransportLogisticsNavigation';
import RenewableEnergyNavigation from '../Apps/RenewableEnergy/RenewableEnergyNavigation';
import HospitalityManagementNavigation from '../Apps/HospitalityManagement/HospitalityManagementNavigation';
import MeditationAppsNavigation from '../Apps/MeditationApps/MeditationAppsNavigation';
import RoboticsMachineryandIoTNavigation from '../Apps/RoboticsMachineryandIoTApp/RoboticsMachineryandIoTNavigation';
import RobotsMain from '../Apps/RoboticsMachineryandIoTApp/RobotsMain';
import AIAppsNavigation from '../Apps/AIApp/AIAppsNavigation';
import WhatsAppNavigation from '../Apps/WhatsApp/WhatsAppNavigation';
import TikTokNavigation from '../Apps/TikTok/TikTokNavigation';
import InstagramNavigation from '../Apps/Instagram/InstagramNavigation';
import FacebookNavigation from '../Apps/Facebook/FacebookNavigation';
import YouTubeNavigation from '../Apps/YouTube/YouTubeNavigation';
import AmazonNavigation from '../Apps/Amazon/AmazonNavigation';
import SpotifyNavigation from '../Apps/Spotify/SpotifyNavigation';
import NetflixNavigation from '../Apps/Netflix/NetflixNavigation';
import eBayNavigation from '../Apps/eBay/eBayNavigation';
import PayPalNavigation from '../Apps/PayPal/PayPalNavigation';
import JustdialNavigation from '../Apps/Justdial/JustdialNavigation';
import CashifyNavigation from '../Apps/Cashify/CashifyNavigation';
import TwitterNavigation from '../Apps/Twitter/TwitterNavigation';
import MyntraNavigation from '../Apps/Myntra/MyntraNavigation';
import TruecallerNavigation from '../Apps/Truecaller/TruecallerNavigation';
import BigBasketNavigation from '../Apps/BigBasket/BigBasketNavigation';
import SnapdealNavigation from '../Apps/Snapdeal/SnapdealNavigation';
import CanvaNavigation from '../Apps/Canva/CanvaNavigation';
import ProductDetailsNavigation from '../Apps/ProductDetails/ProductDetailsNavigation';
import FlipkartNavigation from '../Apps/Flipkart/FlipkartNavigation';
import SnapchatNavigation from '../Apps/Snapchat/SnapchatNavigation';
import MyCityNavigation from '../Apps/MyCity/MyCityNavigation';
import BookingNavigation from '../Apps/Booking/BookingNavigation';
import DiscordNavigation from '../Apps/Discord/DiscordNavigation';
import DuolingoNavigation from '../Apps/Duolingo/DuolingoNavigation';
import McDonaldNavigation from '../Apps/McDonald/McDonaldNavigation';
import MeeshoNavigation from '../Apps/Meesho/MeeshoNavigation';
import GoogleMapsNavigation from '../Apps/GoogleMaps/GoogleMapsNavigation';
import SchoolManagementNavigation from '../Apps/SchoolManagement/SchoolManagementNavigation';
import MarblesNavigation from '../Apps/Marbles/MarblesNavigation';
import PerfumeNavigation from '../Apps/Perfume/PerfumeNavigation';
import LoversNavigation from '../Apps/Lovers/LoversNavigation';
import SpaServicesNavigation from '../Apps/SpaServices/SpaServicesNavigation';
import RapidoNavigation from '../Apps/Rapido/RapidoNavigation';

const AllAppNav = createStackNavigator();

const AllAppNavigations = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AllAppNav.Navigator initialRouteName="AllApps">
                <AllAppNav.Screen name="AllApps" component={AllApps} options={{ headerShown: false }} />
                <AllAppNav.Screen name="ECommerce" component={ECommerceBottomNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="VillageCommunity" component={VillageCommunityNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="SocialMedia" component={SocialMediaNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="FoodDelivery" component={FoodDeliveryNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="RidesBooking" component={RidesBookingNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="EducationApps" component={EducationAppsNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="GamingApps" component={GamingAppsNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Finance" component={FinanceAppsNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="EventTicketing" component={EventTicketingNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="LiveStreaming" component={LiveStreamingNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="RealEstate" component={RealEstateNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="JobFreelance" component={JobFreelanceNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="TravelTourism" component={TravelTourismNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="B2BApp" component={B2BAppNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="SmartHomeManagement" component={SmartHomeManagementNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="SmRoboticsMachineryandIoTartHomeManagement" component={RoboticsMachineryandIoTNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="DatingAppSetup" component={DatingAppSetupNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="DashboardManagement" component={DashboardManagementNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="FashionTrendApps" component={FashionTrendAppsNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="SportsFitness" component={SportsFitnessNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="RajasthanTourist" component={RajasthanTouristNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="MyVillage" component={MyVillageNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="KisanMarket" component={KisanMarketNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="TransportLogistics" component={TransportLogisticsNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="NewsMagazine" component={NewsMagazineNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="RenewableEnergy" component={RenewableEnergyNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="HospitalityManagement" component={HospitalityManagementNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="MeditationApps" component={MeditationAppsNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="RoboticsMachineryandIoT" component={RobotsMain} options={{ headerShown: false }} />
                <AllAppNav.Screen name="AIApps" component={AIAppsNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="WhatsApp" component={WhatsAppNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="TikTok" component={TikTokNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Instagram" component={InstagramNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Facebook" component={FacebookNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="YouTube" component={YouTubeNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Amazon" component={AmazonNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Spotify" component={SpotifyNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Netflix" component={NetflixNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="eBay" component={eBayNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="PayPal" component={PayPalNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Justdial" component={JustdialNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Cashify" component={CashifyNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Twitter" component={TwitterNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Myntra" component={MyntraNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Truecaller" component={TruecallerNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="BigBasket" component={BigBasketNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Snapdeal" component={SnapdealNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Canva" component={CanvaNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="ProductDetails" component={ProductDetailsNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Flipkart" component={FlipkartNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Snapchat" component={SnapchatNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="MyCity" component={MyCityNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Booking" component={BookingNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Discord" component={DiscordNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Duolingo" component={DuolingoNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="McDonald" component={McDonaldNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Meesho" component={MeeshoNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="GoogleMaps" component={GoogleMapsNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="SchoolManagement" component={SchoolManagementNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Marbles" component={MarblesNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Perfume" component={PerfumeNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Lovers" component={LoversNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="SpaServices" component={SpaServicesNavigation} options={{ headerShown: false }} />
                <AllAppNav.Screen name="Rapido" component={RapidoNavigation} options={{ headerShown: false }} />
                </AllAppNav.Navigator>
            {/* <ECommerceBottomNavigation /> */}
        </GestureHandlerRootView>
    );
};

export default AllAppNavigations;