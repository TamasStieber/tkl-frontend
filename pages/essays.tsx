import EssaysContainer from "@/components/EssaysContainer";
import MainWrapper from "@/components/MainWrapper";
import PublicWrapper from "@/components/PublicWrapper";

export default function Essays() {
  return (
    <MainWrapper title="Essays">
      <PublicWrapper title="Essays">
        <EssaysContainer />
      </PublicWrapper>
    </MainWrapper>
  );
}
