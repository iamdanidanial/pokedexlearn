import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useWindowSize } from "hooks";
import { setListLimit } from "store/actions";
import { selectListLimit, selectPokemons } from "store/selectors";

const useMobileLoadMore = () => {
  const [, setTimer] = useState(null);
  const [loading, setLoading] = useState(false);

  const limit = useSelector(selectListLimit);
  const pokemons = useSelector(selectPokemons);

  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  useEffect(() => {
    const handleScroll = () => {
      if (
        Math.ceil(window.scrollY + windowSize.height) >=
        document.body.scrollHeight
      ) {
        if (limit < pokemons.length && windowSize.width <= 768) {
          setLoading(true);
        }

        setTimer(
          setTimeout(() => {
            if (loading) return;

            if (windowSize.width <= 768) {
              dispatch(setListLimit(limit + 20));
            }

            setLoading(false);
          }, 600)
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setTimer(null);
    };
  });

  return loading;
};

export default useMobileLoadMore;
