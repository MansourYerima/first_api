export default function* uuid(start_index) {
    // const fruits = ["mangue", "Citron", "Lemou"];
    // for (let index = 0; index < fruits.length; index++) {
    //     yield fruits[index];
        
    // }

    while (true) {
        yield start_index++;
    }
    
}
