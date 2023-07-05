'use client'

import { useEffect, useState } from 'react'
import getAllProducts from './product.service'
import ErrorDialog from '@/components/errors/ErrorDialog'
import { sharingInformationService } from '@/utils/rxjs/SharingInformation.service'
import { Product } from '@/types/Product'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export default function ProductsManagerPage () {
    const [products, setProducts] = useState<Product[]>([]);
    // const [isError, setErrorState] = useState(false)
    const subscription$ = sharingInformationService.getSubject()
    const [errorTextObj, setErrorText] = useState({
        tittle: '',
        content: '',
        boldContent: '',
        textButton: ''
      })

    useEffect(() => {
        const fetchproducts = async() => {
            const res = await getAllProducts()
            if( res && res.success ) {
                if( res.data !== null && res.data.length !== 0 ) {
                    setProducts(  res.data )
                } else {
                    setErrorText({
                        tittle: 'Upsss...',
                        content: 'No se encontro ningun ...',
                        boldContent: '',
                        textButton: 'OK'
                      })
                    await sharingInformationService.setSubject(true)
                    
                }
            } else {
                setErrorText({
                    tittle: 'Upsss...',
                    content: 'Error al querer consular los productos, favor de comprobar su conexion...',
                    boldContent: '',
                    textButton: 'OK'
                  })
                await sharingInformationService.setSubject(true)

            }
        }    
        fetchproducts()
    }, []);
    console.log(products);
    return <>
        <div> 
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Nombre del producto</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product:Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.nombre_producto}</TableCell>
              <TableCell>{product.descripcion}</TableCell>
              <TableCell>{product.categoria}</TableCell>
              <TableCell>{product.precio}</TableCell>
              <TableCell>{product.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></div>
        <ErrorDialog
            boldContent={errorTextObj.boldContent}
            content={errorTextObj.content}
            textButton={errorTextObj.textButton}
            title={errorTextObj.tittle}
        />
    </>
}