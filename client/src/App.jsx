import useLenis from "./hooks/useLenis";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// 공통 컴포넌트
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"; //Link 이동 시 스크롤 항상 맨 위로

// 페이지 컴포넌트
import Home from "./pages/Home";
import About from "./pages/About";
import Detail from "./pages/Detail";
// 필요한 페이지 추가 import...
import RequireAdmin from "./routes/RequireAdmin"; //Login 했을 때만 URL 접근 가능(라우트 보호 용도)
import Login from "./pages/auth/Login";

// product
import ProductOne from "./pages/product/ProductOne";

// partners
import PartnersList from "./pages/partners/PartnersList";
import PartnersCreate from "./pages/partners/PartnersCreate";
import PartnersEdit from "./pages/partners/PartnersEdit";

// contact us
import ContactUs from "./pages/contact/ContactUs";

//notice
import NoticeList from "./pages/notice/NoticeList";
import NoticeDetail from "./pages/notice/NoticeDetail";
import NoticeWrite from "./pages/notice/NoticeWrite";
import NoticeUpdate from "./pages/notice/NoticeUpdate";

function App() {
  useLenis({
    duration: 1.0, // 전체 스크롤 체감 속도
    wheelMultiplier: 3.0, // 휠 민감도(>1 빠름)
    touchMultiplier: 1.2, // 터치 민감도
    // easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  return (
    <BrowserRouter>
      <ScrollToTop /> {/* 라우트 바뀔 때마다 스크롤 초기화 */}
      <div className="flex flex-col min-h-dvh">
        <Header />
        <main className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route path="/about" element={<About />} />

            <Route path="/detail" element={<Detail />} />

            <Route path="/product/1" element={<ProductOne />} />

            <Route path="/partners" element={<PartnersList />} />

            <Route
              path="/partners/create"
              element={
                <RequireAdmin>
                  <PartnersCreate />
                </RequireAdmin>
              }
            />
            <Route
              path="/partners/:id/edit"
              element={
                <RequireAdmin>
                  <PartnersEdit />
                </RequireAdmin>
              }
            />
            <Route path="/contact" element={<ContactUs />} />

            <Route path="/notices" element={<NoticeList />} />
            <Route path="/notices/:id" element={<NoticeDetail />} />
            <Route
              path="/notices/write"
              element={
                <RequireAdmin>
                  <NoticeWrite />
                </RequireAdmin>
              }
            />
            <Route
              path="/notices/:id/update"
              element={
                <RequireAdmin>
                  <NoticeUpdate />
                </RequireAdmin>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
