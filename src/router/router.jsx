import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout.jsx";
import Home from "../pages/Home/Home.jsx";
import {
  DoctorPrivacyPolicy,
  PatientPrivacyPolicy,
} from "../pages/PrivacyPolicy/PrivacyPolicy.jsx";
import PsychologicalTest from "../pages/PsychologicalTest/PsychologicalTest.jsx";
import OcdTest from "../pages/PsychologicalTest/OcdTest.jsx";
import AccountDeletion from "../pages/AccountDeletion/AccountDeletion.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="privacy-policy/patient" element={<PatientPrivacyPolicy />} />
      <Route path="privacy-policy/doctor" element={<DoctorPrivacyPolicy />} />
      <Route path="psychological-test" element={<PsychologicalTest />} />
      <Route path="psychological-test/:testId" element={<OcdTest />} />
      <Route path="account-deletion" element={<AccountDeletion />} />
    </Route>
  )
);
