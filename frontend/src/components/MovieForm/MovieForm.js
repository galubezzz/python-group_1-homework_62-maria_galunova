import React, {Component} from 'react'
import axios from "axios";
//import {CATEGORIES_URL} from "../../api-urls";

// из библиотеки react-datepicker
// стили для дэйтпикера подключены в index.js! без них он не работает!
import DatePicker from "react-datepicker";

// из библиотеки react-select
import Select from 'react-select';

const CATEGORIES_URL = 'http://localhost:8000/api/v1/category/';

class MovieForm extends Component {
    // в props передаются начальные данные для фильма
    // в дальнейшем они копируются в state и извне компонента MovieForm больше не меняются
    // (всё остальное управление значением movie и его полей лежит на MovieForm).
    constructor(props) {
        super(props);

        // пустой объект фильма для формы создания
        const newMovie = {
            name: "",
            description: "",
            release_date: "",
            finish_date: "",
            poster: null,
            category: []
        };

        this.state = {
            category: [],
            submitEnabled: true,
            // изначально movie пустой (для формы добавления)
            movie: newMovie,
            posterFileName: ""
        };

        // если movie передан через props
        if (this.props.movie) {
            // браузер запрещает программно записывать в value полей типа "file"
            // что-либо, кроме пустой строки
            // поэтому ссылку на текущий постер храним в другом свойстве и отображаем рядом
            this.state.posterUrl = this.props.movie.poster;

            // записываем в state существующий movie
            this.state.movie = this.props.movie;

            // но удаляем у него значение poster
            // чтобы при сабмите формы не отправлять существующий url или пустую строку
            // (чтобы API не ругался, т.к. url и строка не являются файлами).
            // если ничего не отправлять, постер не поменяется.
            this.state.movie.poster = null;
        }
    }

    componentDidMount() {
        // загружаем категории
        axios.get(CATEGORIES_URL)
            .then(response => {
                const category = response.data;
                console.log(category);
                // и сохраняем их в state
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.category = category;
                    return newState;
                });
            })
            .catch(error => {
                console.log(error);
                console.log(error.response)
            });
    }

    // блокировка отправки формы на время выполнения запроса
    disableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = false;
            return newState;
        });
    };

    // разблокировка отправки формы
    enableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = true;
            return newState;
        });
    };

    dateToObject = (date) => {
        return date ? new Date(date) : null;
    };

    getCategoryOptions = () => {
        return this.state.category.map(category => {
            return {value: category.id, label: category.name}
        });
    };

    getCategoryValue = () => {
        if (this.state.category.length > 0) {
            return this.state.movie.category.map(id => {
                const category = this.state.category.find(category => category.id === id);
                return {value: id, label: category.name};
            });
        }
        return [];
    };

    // функция, обновляющая поля в this.state.movie
    updateMovieState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let movie = {...prevState.movie};
            movie[fieldName] = value;
            newState.movie = movie;
            return newState;
        });
    };

    // обработчик ввода в поля ввода
    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateMovieState(fieldName, value);
    };

    // обработчик изменения дат
    dateChanged = (field, date) => {
        this.updateMovieState(field, date.toISOString().slice(0, 10));
    };

    // обработчик изменения select
    selectChanged = (field, values) => {
        console.log(values);
        const category_ids = values.map(item => item.value);
        this.updateMovieState(field, category_ids);
    };

    // обработчик выбора файла
    fileChanged = (event) => {
        const fileName = event.target.value;
        const fieldName = event.target.name;
        const fileObject = event.target.files.length > 0 ? event.target.files[0] : null;
        this.updateMovieState(fieldName, fileObject);
        this.setState(prevState => {
            let newState = {...prevState};
            newState[fieldName + 'FileName'] = fileName;
            return newState;
        });
    };

    // отправка формы
    // внутри вызывает onSubmit - переданное действие - со своим фильмом в качестве аргумента.
    submitForm = (event) => {
        if (this.state.submitEnabled) {
            event.preventDefault();
            this.disableSubmit();

            this.props.onSubmit(this.state.movie)
                .then(this.enableSubmit);
        }
    };

    render() {
        if (this.state.movie) {
            // распаковка данных фильма, чтобы было удобнее к ним обращаться
            const {name, description, release_date, finish_date} = this.state.movie;
            // распаковка переменных из state.
            const {posterFileName, submitEnabled} = this.state;

            // форматирование дат для DatePicker'ов
            const releaseDateSelected = this.dateToObject(release_date);
            const finishDateSelected = this.dateToObject(finish_date);

            // сборка опций для селекта категорий
            // (опции должны иметь формат {value: "значение", label: "подпись"} )
            const selectOptions = this.getCategoryOptions();

            // сборка значений для селекта категорий
            // (значения должны иметь тот же формат из двух полей, что и опции )
            const selectValue = this.getCategoryValue();

            return <div className="mt-3">
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label className="font-weight-bold">Название</label>
                        <input type="text" className="form-control" name="name" value={name}
                               onChange={this.inputChanged}/>
                    </div>
                    <div className="form-group">
                        <label>Описание</label>
                        <input type="text" className="form-control" name="description" value={description}
                               onChange={this.inputChanged}/>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Дата выхода</label>
                        <div>
                            <DatePicker dateFormat="yyyy-MM-dd HH:MM:ss" showTimeSelect timeFormat="HH:mm"
                                        selected={releaseDateSelected}
                                        className="form-control"
                                        name="release_date"
                                        onChange={(date) => this.dateChanged('release_date', date)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Дата завершения проката</label>
                        <div>
                            <DatePicker dateFormat="yyyy-MM-dd HH:MM:ss" showTimeSelect timeFormat="HH:mm"
                                        selected={finishDateSelected} className="form-control"
                                        name="finish_date" onChange={(date) => this.dateChanged('finish_date', date)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Постер</label>
                        <div>
                            <input type="file" name="poster" value={posterFileName} onChange={this.fileChanged}/>
                            {this.state.posterUrl ? <a href={this.state.posterUrl}>Текущий файл</a> : null}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Категории</label>
                        <Select options={selectOptions} isMulti={true} name='category' value={selectValue}
                                onChange={(values) => this.selectChanged('category', values)}/>
                    </div>
                    <button disabled={!submitEnabled} type="submit"
                            className="btn btn-primary">Сохранить
                    </button>
                </form>
            </div>;
        }
    }
}


export default MovieForm;