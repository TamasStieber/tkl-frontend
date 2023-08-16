import BookListsContainer from "@/components/public/BookListsContainers";
import PublicWrapper from "@/components/public/PublicWrapper";

export default function BookLists() {
  return (
    <PublicWrapper title="Book Lists">
      <BookListsContainer />
    </PublicWrapper>
  );
}
