import NavBar from "../components/sharedlayout/NavBar";
import Footer from "../components/sharedlayout/Footer";
import Aside from "../components/sharedlayout/Aside";

import QuestionList from "../components/features/QuestionList";
import styled from "styled-components";

function QuestionListPage() {
  return (
    <div>
      <StyledQuestionListPage>
        <div className="top">
          <NavBar></NavBar>
          <QuestionList></QuestionList>
          <Aside></Aside>
        </div>
        <div className="bottom"></div>
      </StyledQuestionListPage>

      <Footer></Footer>
    </div>
  );
}

export default QuestionListPage;

const StyledQuestionListPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  .top {
    display: flex;
    flex-direction: row;
  }
`;
