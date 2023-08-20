import styled from "styled-components";
import AskQuestionBtn from "../atoms/AskQuestionBtn";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ReactPaginate from "react-paginate";

function QuestionList() {
  const [questionData, setQuestionData] = useState([]);
  const [tab, setTab] = useState("newest");
  const [pageNumber, setPageNumber] = useState(1);

  const filterOptions = ["Newest", "Active", "Unanswered", "Score", "Pop(week)", "Pop(month)"];

  const navigate = useNavigate();
  const goToDetail = (questionId) => {
    navigate(`/questiondetail/${questionId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/v1/questions?tab=${tab}&page=${pageNumber}&size=15`);

        if (response.data.statusCode === 200) {
          setQuestionData(response.data.data);
        } else {
          console.error("Server responded with an error:", response.data.message || "Unknown server error");
        }
      } catch (error) {
        console.error("Error while trying to fetch questions:", error);
      }
    };

    fetchData();
  }, [tab, pageNumber]);

  const handleTab = (selectedTab) => {
    setPageNumber(1);
    setTab(selectedTab);
  };

  const handlePage = (selectedPage) => {
    setPageNumber(selectedPage);
  };

  function formatRelativeTime(dateString) {
    const now = new Date();
    const inputDate = new Date(dateString);

    const seconds = Math.floor((now - inputDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 1) return `${years} years ago`;
    if (years === 1) return "1 year ago";

    if (months > 1) return `${months} months ago`;
    if (months === 1) return "1 month ago";

    if (days > 1) return `${days} days ago`;
    if (days === 1) return "1 day ago";

    if (hours > 1) return `${hours} hours ago`;
    if (hours === 1) return "1 hour ago";

    if (minutes > 1) return `${minutes} minutes ago`;

    return "1 minute ago";
  }

  useEffect(() => console.log("tab:", tab, "page:", pageNumber), [tab, pageNumber]);
  useEffect(() => console.log("data:", questionData), [questionData]);
  return (
    <StyledQuestionList>
      <HeaderContainer>
        <h1 className="headerTitle">All Questions</h1>
        <AskQuestionBtn>Ask Question</AskQuestionBtn>
      </HeaderContainer>
      <FiterContainer>
        <span className="questionCount">{questionData.length || "22,345,751"} quesitons</span>
        <Fiter>
          {filterOptions.map((option, index) => (
            <FilterOption key={index} onClick={() => handleTab(option)} isSelected={tab === option}>
              {option}
            </FilterOption>
          ))}
        </Fiter>
      </FiterContainer>
      <QuestionListContainer>
        {questionData &&
          questionData.map((question) => (
            <Question key={question.questionId}>
              <div className="leftSide">
                <LeftSideInfo>
                  <span className="votes">{question.votes.length} votes</span>
                </LeftSideInfo>
                <LeftSideInfo>
                  <span className="answersAndViews">{question.answers.length} asnswers</span>
                </LeftSideInfo>
                <LeftSideInfo>
                  <span className="answersAndViews">{question.viewCount} views</span>
                </LeftSideInfo>
              </div>
              <div className="rightSide">
                <QuestionTitle onClick={() => goToDetail(question.questionId)}> {question.title} </QuestionTitle>
                <QuestionSummury>{question.body}</QuestionSummury>
                <TagAndUserInfoContainer>
                  <TagContainer>{question.tags && question.tags.map((tag) => <Tag>{tag}</Tag>)}</TagContainer>
                  <UserInfoContainer>
                    <img className="userAvatar" alt="userAvatar" src={logo} />
                    <div className="userName">
                      <span>{question.account.displayName}</span>
                    </div>
                    <div className="createdAt">
                      <span>{formatRelativeTime(question.createdAt)}</span>
                    </div>
                  </UserInfoContainer>
                </TagAndUserInfoContainer>
              </div>
            </Question>
          ))}
      </QuestionListContainer>
      <PaginationContainer>
        <StyledReactPaginate
          pageCount={Math.ceil(questionData.length / 15) || 20}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          previousLabel={"Prev"}
          nextLabel={"Next"}
          onPageChange={({ selected }) => handlePage(selected + 1)}
        />
      </PaginationContainer>
    </StyledQuestionList>
  );
}

export default QuestionList;

const StyledQuestionList = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgb(214, 217, 220);
  padding: 24px;
  padding-right: 0px;
  width: 100vw;
  max-width: 727px;
  min-width: 428px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 50px;
  margin-bottom: 12px;

  .headerTitle {
    font-size: 26px;
    font-weight: 400;
  }
`;

const FiterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 48px;
  .questionCount {
    display: flex;
    align-items: center;
  }
`;

const Fiter = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid rgb(214, 217, 220);
  border-radius: 6px;
  height: 36px;
`;

const FilterOption = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding: 9.6px;
  background-color: ${(props) => (props.isSelected ? "rgb(219, 219, 219)" : "transparent")};

  border-right: 1px solid rgb(214, 217, 220);
  &:last-of-type {
    border-right: none;
  }
  &:hover {
    background-color: hsl(210, 8%, 97.5%);
  }
  //selected: hwb(210deg 89.2% 9.2%);
`;

const QuestionListContainer = styled.ul`
  border-top: 1px solid rgb(214, 217, 220);
  margin-left: -24px;
  list-style: none;
  margin-bottom: 40px;
`;

const Question = styled.li`
  display: flex;
  flex-direction: row;
  padding: 16px;
  height: 124px;

  border-bottom: 1px solid rgb(214, 217, 220);
  .leftSide {
    display: flex;
    flex-direction: column;
    min-width: 108px;
    min-height: 87px;
    margin-right: 16px;
    margin-bottom: 4px;
    font-size: 13px;
  }
  .rightSide {
    display: flex;
    flex-direction: column;
  }
`;
const LeftSideInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
  span.votes {
    color: hwb(0deg 4.64% 95.36%);
  }
  span.answersAndViews {
    color: hwb(210deg 41.4% 51.4%);
  }
`;
const QuestionTitle = styled.h3`
  padding-right: 24px;
  margin-bottom: 2px;
  font-weight: 400;
  font-size: 100%;
  color: hsl(206, 100%, 40%);
  &:hover {
    color: hsl(206, 100%, 52%);
  }
`;
const QuestionSummury = styled.div`
  font-size: 13px;
  height: 34px;
  max-width: 565px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: -2px;
  margin-bottom: 8px;
`;

const TagAndUserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TagContainer = styled.ul`
  display: flex;
  flex-direction: row;
  height: 26px;
  list-style: none;
`;
const Tag = styled.li`
  margin-right: 4px;
  font-size: 13px;
  color: hsl(206, 100%, 40%);
  background-color: hwb(205deg 88.32% 4.32%);
  border-radius: 6px;
  padding: 4px 8px 4px 8px;
  &:hover {
    color: hsl(205, 46%, 32%);
    background-color: hsl(205deg 53% 88%);
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;

  .userAvatar {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
  .userName {
    height: 16px;
    font-size: 12px;
    margin-right: 6px;
    color: hsl(206, 100%, 40%);
  }
  .createdAt {
    height: 16px;
    font-size: 12px;
    color: hwb(210deg 41.4% 51.4%);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  flex-direction: row;
  list-style: none;

  a {
    padding: 6px 8px 6px 8px;
    border-radius: 6px;
    margin-right: 6px;
    border: 1px solid rgb(214, 217, 220);
    font-size: 12px;

    &:hover {
      background-color: rgb(189, 190, 191);
    }
  }
  li.selected {
    a {
      color: white;
      background-color: rgb(244, 130, 37);
    }
  }
`;
