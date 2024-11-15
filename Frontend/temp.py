# import requests

# API_KEY = "827957ef363b46d7843e11f92938836e"

# def get_recipes_by_name(recipe_name):
#     url = f"https://api.spoonacular.com/recipes/search?apiKey={API_KEY}&query={recipe_name}&number=10"
#     response = requests.get(url)
#     data = response.json()
#     return data

# def get_recipe_information(recipe_id):
#     url = f"https://api.spoonacular.com/recipes/{recipe_id}/information?apiKey={API_KEY}"
#     response = requests.get(url)
#     data = response.json()
#     return data

# if __name__ == "__main__":  # Use double underscores for "__main__" instead of "_main_"
#     recipe_name = input("Enter the recipe name: ")
#     recipe_data = get_recipes_by_name(recipe_name)  # Use the user input for the recipe name
#     if recipe_data['results']:
#         print(f"Recipes found with the name '{recipe_name}':\n")
#         for result in recipe_data['results']:
#             print("Title:", result['title'])
#             recipe_info = get_recipe_information(result['id'])
#             if recipe_info:
#                 print("Image: ", recipe_info['image'])
#                 print("Cuisines:", ", ".join(recipe_info['cuisines']))
#                 print("Ready in Minutes:", recipe_info['readyInMinutes'])
#                 print("Servings:", recipe_info['servings'])
#                 print("Dish Types:", ", ".join(recipe_info['dishTypes']))
#                 print("Ingredients:\n")
#                 for ingredient in recipe_info['extendedIngredients']:
#                     print(ingredient['original'])
#                 print()
#                 if 'analyzedInstructions' in recipe_info and recipe_info['analyzedInstructions'] and recipe_info['analyzedInstructions'][0]['steps']:
#                     print("Recipe Steps:")
#                     for step in recipe_info['analyzedInstructions'][0]['steps']:
#                         print(step['step'])
#                 elif 'instructions' in recipe_info and recipe_info['instructions']:
#                     print("Recipe Instructions:")
#                     print(recipe_info['instructions'])
#                 else:
#                     print("Recipe steps not found.")
#                 print()
#     else:
#         print(f"No recipes found with the name: {recipe_name}")


node(1,'node A').
node(2,'node B').
node(3,'node C').
node(4,'node D').
node(5,'node E').
node(6,'node F').
node(7,'node G').

edge(1,2,436).    
edge(1,7,600).
edge(1,3,78).
edge(2,4,399).
edge(2,5,85).
edge(3,7,260).
edge(3,6,227).
edge(3,4,175).
edge(5,7,241).
edge(4,6,390).
edge(4,5,481).

h(1,300).
h(2,250).
h(3,250).
h(4,100).
h(5,80).
h(6,50).
h(7,50).
h(8,200).


name(1,2,'N 163').
name(1,3,'N 343 e 358').
name(2,4,'N 163').
name(4,5,'N 163').
name(3,4,'N 246').
name(3,7,'N 246, 364 e 163').
name(3,6,'N 358 e 364').
name(5,7,'N 163').
name(2,5,'N 163').
name(4,6,'N 358').

find_shortest_path(Origin, Destination):-
	node(C1,Origin),
	node(C2,Destination),
	a_star([[0,C1]],C2,ReversePath),
	reverse(ReversePath, Path),
	write('The best/shortest Path is: '), print_path(Path,names),
           write('name to be traveled will be: '),print_names(names),!.


find_shortest_path(,):- write('There was an error with origin or destination node, please type again').

find_all(Origin, Destination):-
	node(C1,Origin),
	node(C2,Destination),
	a_star([[0,C1]],C2,ReversePath),
	reverse(ReversePath, Path),
	write('A Path was found: '), print_path(Path,names),
	write('name to be traveled will be: '),print_names(names),fail.
find_all(,):- write('That is all!').

a_star(Paths, Dest, [C,Dest|Path]):-
	member([C,Dest|Path],Paths),
	decide_best(Paths, [C1|_]),
	C1 == C.
a_star(Paths, Destination, BestPath):-
	decide_best(Paths, Best),
	delete(Paths, Best, PreviousPaths),
	expand_border(Best, NewPaths),
	append(PreviousPaths, NewPaths, L),
	a_star(L, Destination, BestPath).

decide_best([X],X):-!.
decide_best([[C1,Ci1|Y],[C2,Ci2|_]|Z], Best):-
	h(Ci1, H1),
	h(Ci2, H2),
	H1 +  C1 =< H2 +  C2,
	decide_best([[C1,Ci1|Y]|Z], Best).
decide_best([[C1,Ci1|_],[C2,Ci2|Y]|Z], Best):-
	h(Ci1, H1),
	h(Ci2, H2),
	H1  + C1 > H2 +  C2,
	decide_best([[C2,Ci2|Y]|Z], Best).


expand_border([Cost,node|Path],Paths):-
	findall([Cost,Newnode,node|Path],
		(edge(node, Newnode,_),
		not(member(Newnode,Path))),
		L),
	change_costs(L, Paths).

change_costs([],[]):-!.
change_costs([[Total_Cost,Ci1,Ci2|Path]|Y],[[NewCost_Total,Ci1,Ci2|Path]|Z]):-
	edge(Ci2, Ci1, Distance),
	NewCost_Total is Total_Cost + Distance,
	change_costs(Y,Z).


print_path([Cost],[]):- nl, write('The total cost of the path is: '), write(Cost), write(' kilometers'),nl.
print_path([node,Cost],[]):- node(node, Name), write(Name), write(' '), nl, write('The total cost of the path is: '), write(Cost), write(' kilometers'),nl.
print_path([node,node2|Y],names):-
	node(node, Name),
	name(node,node2,name),
	append([name],R,names),
	write(Name),write(', '),
	print_path([node2|Y],R).

print_names([X]):- write(X), nl, nl.
print_names([X|Y]):-
	write(X),write(' - '),
	print_names(Y).