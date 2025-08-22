import useLenis from "./hooks/useLenis";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// 공통 컴포넌트
import Header from "./components/Header";
import Footer from "./components/Footer";

// 페이지 컴포넌트
import Home from "./pages/Home";
import About from "./pages/About";
import Notice from "./pages/Notice";
import Detail from "./pages/Detail";
// 필요한 페이지 추가 import...

function App() {
  useLenis({
    duration: 1.0, // 전체 스크롤 체감 속도
    wheelMultiplier: 3.0, // 휠 민감도(>1 빠름)
    touchMultiplier: 1.2, // 터치 민감도
    // easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
