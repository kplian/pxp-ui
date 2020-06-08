import React from 'react';
import Products from '../../../_pxp/components/Products';
import ProductsPxp from '../../../_pxp/components/Products/ProductsPxp';

const Example = () => {
    const data = [
        {
            name: 'Dianne',
            urlImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcFYKy7CrMvjbL4hEu0JH4865Qk4zLv9AI58koNxq3HPDkio4Z&usqp=CAU',
            rating: 4,
            available: true,
        },
        {
            name: 'Lucero',
            urlImage: 'https://c4.wallpaperflare.com/wallpaper/105/218/545/angels-barefoot-blondes-commercial-wallpaper-preview.jpg',
            rating: 4.5,
            available: false,
        },
        {
            name: 'Monica',
            urlImage: 'https://c.wallhere.com/photos/6d/98/women_Georgy_Chernyadyev_model_long_hair_looking_at_viewer_blonde_straight_hair_legs-282607.jpg!d',
            rating: 5,
            available: false,
        },
        {
            name: 'Monsserat',
            urlImage: 'https://c.wallhere.com/photos/6d/98/women_Georgy_Chernyadyev_model_long_hair_looking_at_viewer_blonde_straight_hair_legs-282607.jpg!d',
            rating: 2,
            available: true,
        },
        {
            name: 'Marian',
            urlImage: 'https://pbs.twimg.com/media/DUJMTn8XcAAnuAR.jpg',
            rating: 4.5,
            available: false,
        },
        {
            name: 'Monica',
            urlImage: 'https://www.ctvnews.ca/polopoly_fs/1.4169897.1574420912!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg',
            rating: 2.5,
            available: true,
        },
        {
            name: 'Caroline',
            urlImage: 'https://pbs.twimg.com/media/DUJMTn8XcAAnuAR.jpg',
            rating: 4.5,
            available: true,
        }
    ];

    const filters = [
        {
            label: 'available',
            value: 'documento_identidad',
            field: 'tipo_documento',
            criteria: 'equal' // default equal
        },
        {
            label: 'Top 10',
            value: 3,
            field: 'rating',
            criteria: 'greater'
        },
        {
            label: 'All',
            value: '',
            field: '*',
            criteria: 'equal'
        },
    ];

    const config = {
        getDataTable: {
            url: 'seguridad/Persona/listarPersonaFoto',
            params: {
              start: '0',
              limit: '1',
              sort: 'id_persona',
              dir: 'desc', // for seeing every time the last save
              contenedor: 'docs-per',
            },
            load: true,
        },
        columns: {
            title: 'nombre_completo1',
        }
    }

    return (
        <div>
            <ProductsPxp 
                config={ config }
                filters={ filters }
                data={ data }
            />
        </div>
    )
}
export default Example;
