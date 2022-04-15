import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

// style
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientsInput = useRef(null);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(title, method, cookingTime, ingredients);
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };

    try {
      await projectFirestore.collection("recipes").add(doc);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = e => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientsInput.current.focus();
  };

  // rediderect the user when we get data response
  // useEffect(() => {
  //   if (data) {
  //     history.push("/");
  //   }
  // }, [error, history, data]);

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recepi</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={e => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientsInput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients.map(i => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={e => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={e => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="button">submit</button>
      </form>
    </div>
  );
}
