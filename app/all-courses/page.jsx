import BannerSection from "../../components/AllCourses/BannerSection";
import AllJobCoursesSection from "../../components/AllCourses/AllJobCoursesSection";
import Info from "../../components/AllCourses/Info";
import EnquiryFormmCard from "../../components/AllCourses/EnquireForm";
import AboutUs from "../../components/home/AboutUs";

export default function AllCoursesPage() {
  return (
    <div>
      <BannerSection />
      <Info />
      <AllJobCoursesSection />
      <AboutUs />
    </div>
  );
}
