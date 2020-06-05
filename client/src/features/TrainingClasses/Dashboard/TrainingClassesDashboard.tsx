import React, { useEffect, useContext, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import TrainingClassessList from "./TrainingClassessList";
import InfiniteScroll from "react-infinite-scroller";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/RootStore";
import TrainingClassFilter from "./TrainingClassFilter";
import ListItemsPlaceholder from "./ListItemsPlaceholder";

//Functional Component Type
const TrainingClassesDashboard = () => {
  const TrainingClassess = useContext(RootStoreContext).trainingClassessStore;
  const {
    loadingTrainingClassess,
    setCurrentPage,
    currentPage,
    totalPages,
    loading,
  } = TrainingClassess;
  const [loadingNext, setLoadingNext] = useState(false);
  const handleGetNext = () => {
    setLoadingNext(true);
    setCurrentPage(currentPage + 1);
    loadingTrainingClassess().then(() => setLoadingNext(false));
  };
  useEffect(() => {
    loadingTrainingClassess();
  }, [loadingTrainingClassess]);
  // if (loading) return <LoadingComponent />;
  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && currentPage === 0 ? (
          <ListItemsPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && currentPage + 1 < totalPages}
            initialLoad={false}
          >
            <TrainingClassessList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <TrainingClassFilter />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(TrainingClassesDashboard);
